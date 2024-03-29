// Armazenar estados
import { useState } from 'react';

import { Image, ScrollView, View } from 'react-native';

// Feedback visual ao usuário
import Toast from 'react-native-toast-message'

// Validar os dados do formulário
import * as yup from 'yup';

// Navega entre as telas
import { useNavigation } from '@react-navigation/native';

// Estilos dos componentes
import { styles } from './styles';

// Componentes
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Loading } from '@/components/Loading';
import { LinkButton } from '@/components/LinkButton';

// Arquivo com validação do formulário
import { validateSchemaForm } from '@/utils/validateSchema';

// Arquivo com configurações da API
import api from '@/services/api';


export function NewUser() {

  // Armazenar informações nos estados/State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Navega entre as telas
  const navigation = useNavigation();

  // Função que leva a tela login
  function handleLoginScreen() {
    navigation.navigate('login');
  }

  // Função que cadastra o novo usuário
  async function handleAddNewUser() {

    // Utilizo o try/catch para gerenciar exceção/erro
    try { // Permanece no try se não houver nenhum erro

      // Alterar para TRUE e apresentar o loading
      setLoading(true);

      // Validar o formulário com YUP
      await validateSchemaForm.validate(
        { name, email, password }, { abortEarly: false }
      );

      // Requisição para API
      await api.post('/new-users', {
        name,
        email,
        password,
      }).then((response) => { // Acesso o then quando a API retornar o status de sucesso.

        Toast.show({
          type: 'success',
          text1: response.data.message.toString(),
          text2Style: {
            fontSize: 12
          }
        })

        //Alert.alert('Sucesso', response.data.message.toString());
      }).catch((error) => { // Acesso o then quando a API retornar o status de erro.

        Toast.show({
          type: 'error',
          text1: 'Ops',
          text2: error.response.data.message.toString(),
          text2Style: {
            fontSize: 12
          }
        });
        if (error.response) {

          Toast.show({
            type: 'error',
            text1: 'Ops',
            text2: error.response.data.message.toString(),
            text2Style: {
              fontSize: 12
            }
          });

        } else {

          Toast.show({
            type: 'error',
            text1: 'Ops',
            text2: 'Tente Novamente mais tarde.',
            text2Style: {
              fontSize: 12
            }
          });

        }
      });
    } catch (error) { // Acesso o catch quando houver erro no try

      if (error instanceof yup.ValidationError) { // Acessa o IF quando existir a mensagem de erro

        Toast.show({
          type: 'error',
          text1: 'Ops',
          text2: error.errors[0],
          text2Style: {
            fontSize: 12
          }
        });

      } else {// Acessa o ELSE quando não existir mensagem de erro

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
      setLoading(false);
    }
  }

  return (

    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Logo da tela */}
        <Image style={{ marginBottom: 36 }} source={require('@/assets/logo3.png')} />

        {/* Campo nome do usuário */}
        <Input
          placeholder='Nome completo'
          returnKeyType='next'
          value={name}
          editable={!loading}
          onChangeText={setName}
        />

        {/* Campo e-mail do usuário */}
        <Input
          placeholder='E-mail'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='next'
          value={email}
          editable={!loading}
          onChangeText={setEmail}
        />

        {/* Campo senha do usuário */}
        <Input
          placeholder='Senha'
          secureTextEntry={true}
          autoCorrect={false}
          value={password}
          editable={!loading}
          onChangeText={setPassword}
        />

        {/* Botão de Submit/Cadastrar enviar os dados  do formulário */}
        <Button title='Cadastrar' disabled={loading} onPress={handleAddNewUser} />

        {/* Link para acessar a tela/rota de login */}
        <LinkButton title='Login' onPress={handleLoginScreen} />

      </View>
      {
        loading &&
        <Loading />
      }
    </ScrollView>

  );

}
