import { useEffect, useState } from 'react';

// Navegar entre telas
import { useNavigation } from '@react-navigation/native';

// Incluir AsyncStorage para armazenar dados no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View } from 'react-native';

// Estilo do componente
import { styles } from './styles';

// Componentes
import { Button } from '@/components/Button';


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
    const valueToken = await AsyncStorage.getItem('@token');
    const valueName = await AsyncStorage.getItem('@name');
    const valueEmail = await AsyncStorage.getItem('@email');
    setToken(valueToken);
    setName(valueName);
    setEmail(valueEmail);
  }

  useEffect(() => {
    getValue();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>E-mail: {email}</Text>
      <Text style={styles.text}>@Token: {token}</Text>
      <Button title='Login' onPress={handleLoginScreen} />
    </View>
  );
}

