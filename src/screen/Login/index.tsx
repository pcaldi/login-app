// useState - Armazenar estados
// useContext - Compartilhar dados entre as telas
import { useContext, useState } from 'react';

import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '@/context/authContext';

// Navegar entre telas
import { useNavigation } from '@react-navigation/native';

// Feedback visual ao usuário
import Toast from 'react-native-toast-message';

// Validar os dados do formulário
import * as yup from 'yup';

// Incluir AsyncStorage para armazenar dados no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';

// Estilos dos componentes
import { styles } from './styles';

// Componentes
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Loading } from '@/components/Loading';
import { LinkButton } from '@/components/LinkButton';

// Arquivo com configurações da API
import api from '@/services/api';


export function Login() {
  // Armazenar informações nos estados/State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Recuperar a função signIn do context
  const { signIn } = useContext(AuthContext)

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

  // Função que submete o login
  async function handleLoginSubmit() {

    // Utilizo o try/catch para gerenciar exceção/erro
    try { // Permanece no try se não houver nenhum erro

      // Alterar para TRUE e apresentar o loading
      setLoading(true);

      // Validar o formulário com YUP
      await validateSchema.validate(
        { email, password }, { abortEarly: false }
      );

      // Requisição para API
      await api.post('/login', {
        email,
        password,
      }).then((response) => { // Acesso o then quando a API retornar o status de sucesso.
        //console.log(response.data);

        // Salvar/Setar os dados no AsyncStorage
        AsyncStorage.setItem('@token', response.data.user.token);
        AsyncStorage.setItem('@name', response.data.user.name);
        AsyncStorage.setItem('@email', response.data.user.email);

        //Navegar para a página Home
        //navigation.navigate('home')

        // Chamar a função que está no memo e no context
        signIn();

      }).catch((error) => { // Acesso o then quando a API retornar o status de erro.
        //console.log(error.response.data.message.toString());

        // Feedback visual ao usuário
        Toast.show({
          type: 'error',
          text1: 'Ops',
          text2: error.response.data.message.toString(),
          text2Style: {
            fontSize: 12
          }
        })
        if (error.response) {
          // Feedback visual ao usuário
          Toast.show({
            type: 'error',
            text1: 'Ops',
            text2: error.response.data.message.toString(),
            text2Style: {
              fontSize: 12
            }
          });

        } else {
          // Feedback visual ao usuário
          Toast.show({
            type: 'error',
            text1: 'Ops',
            text2: 'Tente Novamente mais tarde.',
            text2Style: {
              fontSize: 12
            }
          });

        }
      })
    } catch (error) { // Acesso o catch quando houver erro no try

      if (error instanceof yup.ValidationError) { // Acessa o IF quando existir a mensagem de erro

        // Feedback visual ao usuário
        Toast.show({
          type: 'error',
          text1: 'Ops',
          text2: error.errors[0],
          text2Style: {
            fontSize: 12
          }
        });

      } else {// Acessa o ELSE quando não existir mensagem de erro

        // Feedback visual ao usuário
        Toast.show({
          type: 'error',
          text1: 'Ops',
          text2: 'Tente Novamente mais tarde.',
          text2Style: {
            fontSize: 12
          }
        });

      }
    } finally {

      // Alterar para false e ocultar loading
      setLoading(false);
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>

        {/* Logo da tela */}
        <Image style={{ marginBottom: 36 }} source={require('@/assets/logo3.png')} />

        {/* Campo e-mail do usuário */}
        <Input
          placeholder='Usuário'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='next'
          editable={!loading}
          value={email}
          onChangeText={text => setEmail(text)}
        />

        {/* Campo senha do usuário */}
        <Input
          placeholder='Senha'
          secureTextEntry={true}
          autoCorrect={false}
          editable={!loading}
          value={password}
          onChangeText={setPassword}
        />

        {/* Botão de Submit/Acessar enviar os dados do formulário */}
        <Button title='Acessar' disabled={loading} onPress={handleLoginSubmit} />

        {/* Link para acessar a tela/rota de cadastrar novo usuário */}
        <LinkButton title='Cadastrar' onPress={handleNewUserScreen} />


        {/* Link para acessar a tela/rota de recuperar senha do usuário */}
        <LinkButton title='Recuperar Senha' onPress={handleRecoverPasswordScreen} />

        {
          loading &&
          <Loading />
        }
      </View>
    </ScrollView>
  );
}

