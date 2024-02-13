// useState - Armazenar estados
import { useState } from 'react';

import { Alert, Image, View } from 'react-native';

// Estilo dos componentes
import { styles } from './styles';

// Navegar entre telas
import { useNavigation } from '@react-navigation/native';

// Arquivo com configurações da API
import api from '@/services/api';

// Validar os dados do formulário
import * as yup from 'yup';

// Componentes
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Loading } from '@/components/Loading';
import { LinkButton } from '@/components/LinkButton';
import { Header } from '@/components/Header';

// Criar e exportar a função com a tela home
export function VerifyKey() {
  // Armazenar informações nos estados/State
  const [recoverPasswordToken, setRecoverPasswordToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [formNewPassword, setFormNewPassword] = useState(false);
  const [password, setPassword] = useState('');

  // Navegar entre as telas
  const navigation = useNavigation();

  // Função que leva a tela login
  function handleLoginScreen() {
    navigation.navigate('login');
  }

  async function handleVerifyKey() {
    //Alert.alert('', 'Verificar')

    // Utilizo o try/catch para gerenciar exceção/erro
    try { // Permanece no try se não houver nenhum erro

      // Alterar para TRUE e apresentar o loading
      setLoading(true);

      // Validar o formulário com YUP
      await validateSchema.validate(
        { recoverPasswordToken }, { abortEarly: false }
      );

      // Requisição para API
      await api.post('/validate-recover-password-token', { recoverPasswordToken })
        .then((response) => {

          Alert.alert("Sucesso", response.data.message);

          setFormNewPassword(true)

        })
        .catch((err) => { // Acesso o then quando a API retornar o status de erro.
          //console.log(err.response.data.message.toString());

          // Feedback visual ao usuário
          //Alert.alert('Ops', err.response.data.message.toString())

          if (err.response) {

            // Feedback visual ao usuário
            Alert.alert('Ops', err.response.data.message.toString())

          } else {

            // Feedback visual ao usuário
            Alert.alert('Ops', 'Tente Novamente mais tarde.')

          }

        });
    } catch (error) {
      if (error instanceof yup.ValidationError) { // Acessa o IF quando existir a mensagem de erro

        // Feedback visual ao usuário
        Alert.alert('Ops', error.errors[0])

      } else {// Acessa o ELSE quando não existir mensagem de erro

        // Feedback visual ao usuário
        Alert.alert('Ops', 'Tente Novamente mais tarde.')

      }
    } finally {

      // Alterar para FALSE para retirar o loading
      setLoading(false);
    }
  }

  // Validar o formulário com YUP
  const validateSchema = yup.object({
    recoverPasswordToken: yup.string()
      .required('Error: Necessário preencher o campo Código de verificação!')
  });

  async function handleEditPassword() {

    // Utilizo o try/catch para gerenciar exceção/erro
    try { // Permanece no try se não houver nenhum erro

      // Alterar para TRUE e apresentar o loading
      setLoading(true);

      // Validar o formulário com YUP
      await validateSchemaPassword.validate(
        { password, recoverPasswordToken }, { abortEarly: false }
      );

      await api.put('/update-password-token', {
        password, recoverPasswordToken
      })
        .then((response) => {
          Alert.alert("Sucesso", response.data.message);

          // Retorna para a tela de login
          navigation.navigate('login');
        })
        .catch((err) => { // Acesso o then quando a API retornar o status de erro.
          //console.log(err.response.data.message.toString());

          // Feedback visual ao usuário
          //Alert.alert('Ops', err.response.data.message.toString())

          if (err.response) {

            // Feedback visual ao usuário
            Alert.alert('Ops', err.response.data.message.toString())

          } else {

            // Feedback visual ao usuário
            Alert.alert('Ops', 'Tente Novamente mais tarde.')

          }

        });



    } catch (error) {
      if (error instanceof yup.ValidationError) { // Acessa o IF quando existir a mensagem de erro

        // Feedback visual ao usuário
        Alert.alert('Ops', error.errors[0])

      } else {// Acessa o ELSE quando não existir mensagem de erro

        // Feedback visual ao usuário
        Alert.alert('Ops', 'Tente Novamente mais tarde.')

      }
    } finally {

      // Alterar para FALSE para retirar o loading
      setLoading(false);
    }
  }

  // Validar o formulário com YUP
  const validateSchemaPassword = yup.object({
    recoverPasswordToken: yup.string()
      .required('Error: Necessário preencher o campo Código de verificação!'),
    password: yup.string()
      .required('Error: Necessário preencher o campo senha!')
      .min(6, 'A senha deve ter no mínimo 6 caracteres')

  });


  return (
    <View style={styles.container}>

      {/* Se formNewPassword for TRUE, carrega o header da nova senha */}
      {formNewPassword ? <Header title='Nova Senha' /> : <Header title='Verificar o código' />}

      <View style={styles.content}>

        {/* Logo da tela */}
        <Image style={{ marginBottom: 36 }} source={require('@/assets/logo3.png')} />

        {/* Se formNewPassword for TRUE, carrega o formulário da nova senha */}
        {formNewPassword ? (
          <>
            {/* Campo senha do usuário */}
            <Input
              placeholder='Senha como no mínimo 6 caracteres'
              secureTextEntry={true}
              autoCorrect={false}
              value={password}
              editable={!loading}
              onChangeText={setPassword}
            />

            {/*  Botão de Submit/Acessar enviar os dados do formulário */}
            <Button title='Salvar' disabled={loading} onPress={handleEditPassword} />
          </>
        ) : (
          <>
            {/* Campo código de verificação */}
            < Input
              placeholder='Código de verificação'
              autoCorrect={false}
              autoCapitalize='none'
              value={recoverPasswordToken}
              editable={!loading}
              onChangeText={setRecoverPasswordToken}
            />

            {/*  Botão de Submit/Acessar enviar os dados do formulário */}
            <Button title='Validar' disabled={loading} onPress={handleVerifyKey} />

            {/*  Link para acessar a tela/rota de login */}
            <LinkButton title='Login' onPress={handleLoginScreen} />
          </>
        )
        }

        {
          loading &&
          <Loading />
        }
      </View>

    </View>
  )
}
