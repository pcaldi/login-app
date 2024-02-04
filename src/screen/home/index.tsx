import { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import api from '@/services/api';


export function Home() {
  // Armazenar informações do usuário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Navegar entre as telas
  const navigation = useNavigation();

  // Função que leva a rota newUser
  function handleNewUserScreen() {
    navigation.navigate('newUser');
  }

  // Função que leva a rota recoverPassword
  function handleRecoverPasswordScreen() {
    navigation.navigate('recoverPassword');
  }

  async function handleLoginSubmit() {

    if (!validate()) return;

    await api.post('/login', {
      email,
      password,
    }).then((response) => {
      //console.log(response.data.message.toString());
      Alert.alert('Sucesso', response.data.message.toString());
    }).catch((error) => {
      //console.log(error.response.data.message.toString());
      Alert.alert('Ops', error.response.data.message.toString());
      if (error.response) {
        Alert.alert('Ops', error.response.data.message.toString());
      } else {
        Alert.alert('Ops', 'Tente Novamente mais tarde.');
      }
    });
  }

  const validate = () => {
    if (!email) {
      Alert.alert('Ops', 'Necessário preenchimento do campo usuário.');
      return false;
    }
    if (!password) {
      Alert.alert('Ops', 'Necessário preenchimento do campo senha.');
      return false;
    }
    return true
  }

  return (
    <View style={styles.container}>
      <Image style={{ marginBottom: 36 }} source={require('@/assets/logo3.png')} />
      <Input
        placeholder='Usuário'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='next'
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder='Senha'
        secureTextEntry={true}
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
      />
      <Button title='Acessar' onPress={handleLoginSubmit} />

      <TouchableOpacity style={styles.titleBtn} activeOpacity={0.7} onPress={handleNewUserScreen}>
        <Text style={styles.title}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.titleBtn} activeOpacity={0.7} onPress={handleRecoverPasswordScreen}>
        <Text style={styles.title}>Recuperar Senha</Text>
      </TouchableOpacity>

    </View>
  );
}

