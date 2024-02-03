import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';


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
        value={password}
        onChangeText={setPassword}
      />
      <Button title='Acessar' />

      <TouchableOpacity style={styles.titleBtn} activeOpacity={0.7} onPress={handleNewUserScreen}>
        <Text style={styles.title}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.titleBtn} activeOpacity={0.7} onPress={handleRecoverPasswordScreen}>
        <Text style={styles.title}>Recuperar Senha</Text>
      </TouchableOpacity>

    </View>
  );
}

