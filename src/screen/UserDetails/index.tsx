// useState - Armazenar estados
// useEffect - Criar efeito colateral em componentes funcionais
import { useCallback, useState } from 'react';

// Componentes para estruturar o conteúdo
import { ScrollView, Text, View } from 'react-native';

// Incluir os componentes utilizado para estruturar o conteúdo
import { styles } from './styles';

// Navegação entre as telas e hooks de navegação
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

// Componentes
import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { Button } from '@/components/Button';

import { UserDTO } from '@/dtos/UserDTO';

// Arquivo com configurações da API
import api from '@/services/api';

// Incluir AsyncStorage para armazenar/recuperar dados no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';

// Feedback visual ao usuário
import Toast from 'react-native-toast-message';



// Definindo o tipo esperado para os parâmetros da rota
export type RouteParamsProp = {
  userId: string;
}

// Criar e exportar a função com a tela home
export function UserDetails() {


  const [user, setUser] = useState<UserDTO>(); // Inicialize user como um único objeto UserDTO | null
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


    await api.get(`/users/${userId}`, {
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {// Acesso o then quando a API retornar o status de sucesso

        //console.log(response.data.user);
        setUser(response.data.user);

      })

      .catch((err) => { // Acesso o then quando a API retornar o status de erro

        if (err.response) {
          // Feedback visual ao usuário
          Toast.show({
            type: 'error',
            text1: 'Ops',
            text2: err.response.data.message.toString(),
            text2Style: {
              fontSize: 12
            }
          });
          // Retornar o usuário para a tela de Lista
          navigation.navigate('listUser');
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
          // Retornar o usuário para a tela de Lista
          navigation.navigate('listUser');
        }
      })
      .finally(() => { // Alterar para false e ocultar loading
        setLoading(false);
      });
  }

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
          IconName='page-first'
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
                title='Editar'
                variant='outline'
                iconName='account-edit-outline'
                onPress={() => navigation.navigate('editUser', { userId: user.id })}
              />

              <Button
                title='Deletar'
                variant='delete'
                iconName='trash-can-outline'
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
