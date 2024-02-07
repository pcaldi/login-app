import { useEffect, useState } from 'react';

// Navegar entre telas
import { useNavigation } from '@react-navigation/native';

// Incluir AsyncStorage para armazenar dados no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getValToken } from '@/services/auth';

import { Text, View } from 'react-native';

// Estilo do componente
import { styles } from './styles';

// Componentes
import { Header } from '@/components/Header';
import Toast from 'react-native-toast-message';


export function Home() {
  // Armazenar informações nos estados/State
  const [token, setToken] = useState<string | null>('');
  const [name, setName] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');

  // Navegar entre as telas
  const navigation = useNavigation();

  // Função que retorna para a tela de login
  function handleLoginScreen() {
    navigation.navigate('login');
  }

  // Recuperar o valor que esta no AsyncStorage
  const getValue = async () => {

    try {
      const valToken = await getValToken();

      if (valToken === null) {
        Toast.show({
          type: 'error',
          text1: 'Ops',
          text2: 'Erro: Necessário realizar o login para acessar a página.',
          text2Style: {
            fontSize: 11
          }
        });
        // Redirecionar para tela de login
        navigation.navigate('login');
      } else {

        const valName = await AsyncStorage.getItem('@name');
        const valEmail = await AsyncStorage.getItem('@email');
        setToken(valToken);
        setName(valName);
        setEmail(valEmail);
      }

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Ops',
        text2: 'Erro: Necessário realizar o login para acessar a página.',
        text2Style: {
          fontSize: 11
        }
      });
      // Redirecionar para tela de login
      navigation.navigate('login');
    }

  }

  useEffect(() => {
    getValue();
  }, [])

  return (
    <View style={styles.container}>
      <Header title='Home' IconName='logout' onPress={handleLoginScreen} />


      <View style={styles.content}>
        <Text style={styles.text}>Name: {name}</Text>
        <Text style={styles.text}>E-mail: {email}</Text>
        <Text style={styles.text}>@Token: {token}</Text>
      </View>
    </View>
  );
}

