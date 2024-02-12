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
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { Loading } from '@/components/Loading';
import { LinkButton } from '@/components/LinkButton';


export function RecoverPassword() {
  // Armazenar informações nos estados/State
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Navegar entre as telas
  const navigation = useNavigation();

  // Função que leva a tela login
  function handleLoginScreen() {
    navigation.navigate('login');
  }

  async function handleRecoverPassword() {
    //Alert.alert('Sucesso', 'Recover Password');

    try {// Permanece no try se não houver nenhum erro

      // Alterar para TRUE e apresentar o loading
      setLoading(true);

      // Validar o formulário com YUP
      await validateSchema.validate(
        { email }, { abortEarly: false }
      );

      // Requisição para API
      await api.post("/recover-password-token", { email })
        .then((response) => {// Acesso o then quando a API retornar o status de sucesso.
          //console.log(response.data);
          Alert.alert("Sucesso", response.data.message)

          navigation.navigate('verifyKey');

        }).catch((err) => { // Acesso o then quando a API retornar o status de erro.
          //console.log(err.response.data.message.toString());

          // Feedback visual ao usuário
          Alert.alert('Ops', err.response.data.message.toString())

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

      // Alterar para false e ocultar loading
      setLoading(false);
    }
  }

  // Validar o formulário com YUP
  const validateSchema = yup.object({
    email: yup.string()
      .required('Error: Necessário preencher email válido.')
      .email('Error: Necessário preencher o campo com um e-mail válido.'),
  });

  return (
    <View style={styles.container}>
      <Header title='Recuperar Senha' />

      <View style={styles.content}>

        {/* Logo da tela */}
        <Image style={{ marginBottom: 36 }} source={require('@/assets/logo3.png')} />

        {/* Campo e-mail do usuário */}
        <Input
          placeholder='E-mail cadastrado'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='next'
          editable={!loading}
          value={email}
          onChangeText={text => setEmail(text)}
        />

        {/* Botão de Submit/Acessar enviar os dados do formulário */}
        <Button title='Enviar' disabled={loading} onPress={handleRecoverPassword} />

        {/* Link para acessar a tela/rota de login */}
        <LinkButton title='Login' onPress={handleLoginScreen} />

        {
          loading &&
          <Loading />
        }
      </View>

    </View>
  );
}

