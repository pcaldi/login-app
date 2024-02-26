// useState - Armazenar estados
// useEffect - Criar efeito colateral em componentes funcionais
//useCallback - A função não será recriada a cada renderização, somente quando houver atualização na dependência
import { useCallback, useState } from 'react';

// Componentes para estruturar o conteúdo
import { Alert, Image, ScrollView, Text, View } from 'react-native';

// Incluir os componentes utilizado para estruturar o conteúdo
import { styles } from './styles';

//useFocusEffect - para executar um efeito quando componente  recebe foco
// Navegação entre as telas e hooks de navegação
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

// Componentes
import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { Button } from '@/components/Button';

// DTO - Data Transfer Object
import { UserDTO } from '@/dtos/UserDTO';

// Arquivo com configurações da API
import api from '@/services/api';

// Incluir AsyncStorage para armazenar/recuperar dados no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo o tipo esperado para os parâmetros da rota
export type RouteParamsProp = {
  userId: string;
}

// Criar e exportar a função com a tela home
export function UserDetails() {


  const [user, setUser] = useState<UserDTO>(); // Inicialize user como um único objeto UserDTO
  const [loading, setLoading] = useState(false);


  // Obtendo a rota atual usando o hook useRoute
  const route = useRoute();

  // Extraindo o parâmetro userId da rota e indicando ao TypeScript o tipo esperado usando as RouteParamsProp
  const { userId } = route.params as RouteParamsProp;

  //console.log(userId);

  const navigation = useNavigation();


  const getUserDetails = async () => {

    // Alterar para TRUE e apresentar o loading
    setLoading(true);

    // Recuperar o token
    const token = await AsyncStorage.getItem('@token')

    // Requisição para a API indicando a rota e os dados
    await api.get(`/users/${userId}`, {
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {// Acesso o then quando a API retornar o status de sucesso

        //console.log(response.data.user.image);

        setUser(response.data.user);

      })

      .catch((error) => {// Acessa o catch quando a API retornar erro

        if (error.response) { // Acessa o if quando API retornar erro
          Alert.alert("Ops", error.response.data.message)

        } else { // Acessa o ELSE quando a API não responder
          Alert.alert("Ops", "Erro: Tente mais tarde!")
        }

      })
      .finally(() => { // Alterar para false e ocultar loading
        setLoading(false);
      });
  }

  const handleDeleteUser = async () => {

    // Alterar para TRUE e apresentar o loading
    setLoading(true)

    // Recupero o token
    const token = await AsyncStorage.getItem('@token')

    // Requisição para a API indicando a rota e os dados
    await api.delete(`/users/${userId}`, {
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {// Acessa o then quando a API retornar status sucesso

        Alert.alert('Sucesso', response.data.message)

        // Redireciono o usuário para a tela listUSer
        navigation.navigate('listUser');

      })
      .catch((error) => {// Acessa o catch quando a API retornar erro

        if (error.response) { // Acessa o if quando API retornar erro
          Alert.alert("Ops", error.response.data.message)

        } else { // Acessa o ELSE quando a API não responder
          Alert.alert("Ops", "Erro: Tente mais tarde!")
        }

      })
      .finally(() => {
        // Alterar para FALSE e retiro o loading
        setLoading(true)

      })
  }

  //useFocusEffect - para executar um efeito quando componente  recebe foco
  //useCallback - A função não será recriada a cada renderização, somente quando houver atualização na dependência
  useFocusEffect(
    useCallback(() => {
      getUserDetails();

    }, [])
  )


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          title='Detalhes do usuário'
          IconName='backburger'
          onPress={() => { navigation.goBack() }}
        />

        {user &&


          <View style={styles.content}>

            <View style={styles.contentView}>
              <Text style={styles.title}>ID</Text>
              <Text style={styles.subtitle}>{user.id}</Text>
            </View>

            <View style={styles.contentView}>
              <Text style={styles.title}>Nome</Text>
              <Text style={styles.subtitle}>{user.name}</Text>
            </View>

            <View style={styles.contentView}>
              <Text style={styles.title}>E-mail</Text>
              <Text style={styles.subtitle}>{user.email}</Text>
            </View>

            <View style={styles.contentView}>
              <Text style={styles.title}>Situação</Text>
              <Text style={styles.subtitle}>{user.Situation.nameSituation}</Text>
            </View>

            <View style={styles.btnView}>

              <Button
                title='Editar Usuário'
                variant='outline'
                iconName='account-edit-outline'
                onPress={() => navigation.navigate('editUser', { userId: user.id })}
              />

              <Button
                title='Editar Senha'
                variant='editPassword'
                iconName='lock-reset'
                onPress={() => navigation.navigate('editPasswordUser', { userId: user.id })}
              />

              <Button
                title='Deletar Usuário'
                variant='delete'
                iconName='trash-can-outline'
                onPress={handleDeleteUser}
              />

            </View>


          </View>
        }

        {
          loading &&
          <Loading />
        }
      </View>
    </ScrollView>
  )
}
