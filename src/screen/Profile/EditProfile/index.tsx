import { useState } from "react";

// Incluir os componentes utilizado para estruturar o conteúdo
import { Alert, Text, View } from "react-native";

// Incluir os componentes utilizado para estilizar o conteúdo
import { styles } from "./styles";

// Validar os dados do formulário
import * as yup from 'yup';

// Componentes
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/Button";
import { InputForm } from "@/components/InputForm";

// Navegar entre as telas
import { useNavigation } from "@react-navigation/native";

// Incluir AsyncStorage para armazenar/recuperar dados no dispositivo
import AsyncStorage from "@react-native-async-storage/async-storage";

// Arquivo com configurações da API
import api from "@/services/api";
import { validateSchemaEdit } from "@/utils/validateSchema";

export function EditProfile() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  // Navegar entre as telas
  const navigation = useNavigation();


  async function handleEditProfile() {
    try {
      //Alterar para TRUE e apresentar loading
      setLoading(true);

      // Validar o formulário com YUP
      await validateSchemaEdit.validate({ name, email }, { abortEarly: false });

      // Recuperar o token
      const token = await AsyncStorage.getItem('@token');

      await api.put('/profile', { name, email }, {
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          // Acessa o then quando a API retornar sucesso
          Alert.alert('Sucesso', response.data.message)

          // Redirecionar para tela Edit Profile
          navigation.navigate('editProfile');

        })
        .catch((error) => {// Acessa o catch quando a API retornar erro

          if (error.response) { // Acessa o if quando API retornar erro
            Alert.alert("Ops", error.response.data.message)

          } else { // Acessa o ELSE quando a API não responder
            Alert.alert("Ops", "Erro: Usuário não editado, tente mais tarde!")
          }

        });

    } catch (error) {// Acesso o catch quando houver erro no try
      if (error instanceof yup.ValidationError) { // Acessa o IF quando existir a mensagem de erro
        Alert.alert("Ops", error.errors[0]);
      } else { // Acessa o ELSE quando não existir a mensagem de erro
        Alert.alert("Ops", "Erro: Usuário não editado, tente mais tarde!");
      }

    } finally {

      // Alterar para False e retira loading
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>

      <Header
        title="Editar Perfil"
        IconName="backburger"
        onPress={() => navigation.goBack()}
      />


      <View style={styles.formContainer}>
        <View style={styles.formLabel}>
          <Text style={styles.textForm}>* Nome</Text>

        </View>

        <InputForm
          placeholder='Nome completo'
          placeholderTextColor='#c2c2c2'
          autoCorrect={false}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formLabel}>

          <Text style={styles.textForm}>* E-mail</Text>
        </View>

        <InputForm
          placeholder='E-mail válido'
          placeholderTextColor='#c2c2c2'
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='email-address'
          returnKeyType='next'
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.viewRequired}>
        <Text style={styles.txtRequired}>* Campo Obrigatório</Text>
      </View>

      <View style={styles.btnView}>

        <Button
          title='Salvar'
          iconName='account-edit-outline'
          disabled={loading}
          onPress={handleEditProfile}
        />


      </View>

      {
        loading &&
        <Loading />
      }

    </View>
  )
}
