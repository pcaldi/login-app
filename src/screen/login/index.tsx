import { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';

import { styles } from './styles';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import api from '@/services/api';


export function Login() {
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

    try {
      // Validar o formulário com YUP
      await validateSchema.validate(
        { email, password }, { abortEarly: false }
      );

      // Requisição para API
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
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Alert.alert('Ops', error.errors[0]);
      };
    }

  }

  // Validar o formulário com YUP
  const validateSchema = yup.object({
    email: yup.string()
      .required('Error: Necessário preencher o campo usuário.')
      .email('Error: Necessário preencher o campo com um e-mail válido.'),
    password: yup.string().required('Error: Necessário preencher o campo senha.')
  });

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

