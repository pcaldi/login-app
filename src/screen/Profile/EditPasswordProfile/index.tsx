import { useState } from "react";

import { Alert, Text, View } from "react-native";// Incluir os componentes utilizado para estilizar o conteúdo
import { styles } from "./styles";

// Arquivo com configurações da API
import api from '@/services/api';

// Validar os dados do formulário
import * as yup from 'yup';


// Componentes
import { Header } from "@/components/Header";
import { InputForm } from "@/components/InputForm";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";

// Navegar entre as telas
import { useNavigation } from "@react-navigation/native";
// Incluir AsyncStorage para armazenar/recuperar dados no dispositivo
import AsyncStorage from "@react-native-async-storage/async-storage";

// Validação com YUP
import { validateSchemaEditPassword } from "@/utils/validateSchema";


export function EditPasswordProfile() {

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Navegar entre as telas
  const navigation = useNavigation();


  async function handleEditPassword() {
    try {
      // Alterar para TRUE e apresentar o loading
      setLoading(true);

      // Recuperar o token
      const token = await AsyncStorage.getItem('@token');

      // Validar formulário com YUP
      await validateSchemaEditPassword.validate({ password }, { abortEarly: false });

      // Requisição para a API indicando a rota e os dados
      await api.put("/profile-password", { password }, {
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => { // Acessa o then quando a API retornar status sucesso
          Alert.alert("Sucesso", response.data.message)

          // Redirecionar para tela Detalhes do usuário após editar
          navigation.navigate('profileDetails')

        })
        .catch((error) => {// Acessa o catch quando a API retornar status erro

          if (error.response) { // Acessa o IF quando a API retornar erro
            Alert.alert("Ops", error.response.data.message.toString());
          } else { // Acessa o ELSE quando a API não responder
            Alert.alert("Ops", "Erro: Senha não editada, tente mais tarde!");
          }
        });

    } catch (error) {

      if (error instanceof yup.ValidationError) { // Acessa o IF quando existir a mensagem de erro
        Alert.alert("Ops", error.errors[0]);
      } else { // Acessa o ELSE quando não existir a mensagem de erro
        Alert.alert("Ops", "Erro: Usuário não editado, tente mais tarde!");
      }
    } finally {
      // Alterar para FALSE e retira o loading
      setLoading(false);
    }
  }



  return (
    <View style={styles.container}>
      <Header
        title="Editar Senha"
        IconName="backburger"
        onPress={() => navigation.goBack()}
      />

      <View style={styles.formContainer}>
        <View style={styles.formLabel}>

          <Text style={styles.textForm}>Nova Senha</Text>
        </View>

        <InputForm
          placeholder='Senha deve conter 6 caracteres..'
          placeholderTextColor='#c2c2c2'
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry={true}
          returnKeyType='next'
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.btnView}>

        <Button
          title='Salvar'
          iconName='lock-reset'
          disabled={loading}
          onPress={handleEditPassword}
        />

      </View>

      {
        loading &&
        <Loading />
      }
    </View>
  )
}
