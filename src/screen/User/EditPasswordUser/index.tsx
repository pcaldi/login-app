//useState - Armazenar estados
// useEffect - Criar efeito colateral em componentes funcionais
import { useEffect, useState } from "react";

// Incluir os componentes utilizado para estruturar o conteúdo
import { Alert, Text, View } from "react-native";

// Incluir os componentes utilizado para estilizar o conteúdo
import { styles } from "./styles";

// Arquivo com configurações da API
import api from '@/services/api';

// Validar os dados do formulário
import * as yup from 'yup';

// Incluir AsyncStorage para armazenar/recuperar dados no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componentes
import { Header } from "@/components/Header";
import { InputForm } from "@/components/InputForm";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";

//useNavigation - Navegação entre as telas
import { useNavigation, useRoute, } from '@react-navigation/native';

// Validação com YUP
import { validateSchemaEditPassword } from "@/utils/validateSchema";

// Tipo esperado para os parâmetros da rota
import { RouteParamsProp } from "../UserDetails";


export function EditPasswordUser() {

  // Armazenar informações nos estados/State
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Navegar entre as telas
  const navigation = useNavigation();

  // Obtendo a rota atual usando o hook useRoute
  const route = useRoute();

  // Extraindo o parâmetro userId da rota e indicando ao TypeScript o tipo esperado usando as RouteParamsProp
  const { userId } = route.params as RouteParamsProp


  // Processar / submeter os dados do formulário
  const getUser = async () => {

    // Alterar para TRUE e apresentar loading
    setLoading(true);

    // Recuperar o token
    const token = await AsyncStorage.getItem('@token')

    // Requisição para a API indicando a rota e os dados
    await api.get(`/users/${userId}`, {
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => { // Acessar o then quando a API retornar status sucesso

        //console.log(response.data.user.id);

        setId(response.data.user.id);

        // Redirecionar para tela listar após editar
        //navigation.navigate('listUser');

      }).catch((error) => { // Acessar o catch quando a API retornar status erro

        if (error.response) { // Acessa o IF quando a API retornar erro
          Alert.alert("Ops", error.response.data.message.toString());
        } else { // Acessa o ELSE quando a API não responder
          Alert.alert("Ops", "Erro: Usuário não editado, tente mais tarde!");
        }

      }).finally(() => {

        // Alterar para FALSE e retira loading
        setLoading(false);
      })

  }

  useEffect(() => {
    getUser();
  }, [])


  async function handleEditPassword() {

    try {

      // Alterar para TRUE e apresentar loading
      setLoading(true);

      // Recuperar o token
      const token = await AsyncStorage.getItem('@token');

      // Validar o formulário com Yup
      await validateSchemaEditPassword.validate({ password }, { abortEarly: false });

      // Requisição para a API indicando a rota e os dados
      await api.put("/users-password", { id, password }, {
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => { // Acessa o then quando a API retornar status sucesso

          Alert.alert('Sucesso', response.data.message);

          // Redirecionar para tela Detalhes do usuário após editar
          navigation.navigate('userDetails', { userId: id })
          //navigation.navigate('listUser');
        })
        .catch((error) => { // Acessar o catch quando a API retornar status erro

          if (error.response) { // Acessa o IF quando a API retornar erro
            Alert.alert("Ops", error.response.data.message.toString());
          } else { // Acessa o ELSE quando a API não responder
            Alert.alert("Ops", "Erro: Senha não editada, tente mais tarde!");
          }
        });

    } catch (error) {// Acesso o catch quando houver erro no try

      if (error instanceof yup.ValidationError) { // Acessa o IF quando existir a mensagem de erro
        Alert.alert("Ops", error.errors[0]);
      } else { // Acessa o ELSE quando não existir a mensagem de erro
        Alert.alert("Ops", "Erro: Usuário não editado, tente mais tarde!");
      }

    } finally {

      // Alterar para FALSE e retira loading
      setLoading(false);

    }
  }

  return (
    <View style={styles.container}>

      <Header
        title="Editar senha"
        IconName="backburger"
        onPress={() => { navigation.goBack() }}
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
  );
}
