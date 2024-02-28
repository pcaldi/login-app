// useState - Armazenar estados
//useCallback - A função não será recriada a cada renderização, somente quando houver atualização na dependência
import { useCallback, useState } from 'react';

// Componentes para estruturar o conteúdo
import { View, ScrollView, Text, Pressable } from 'react-native';

//useFocusEffect - para executar um efeito quando componente  recebe foco
// Navegação entre as telas
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Arquivo com configurações da API
import api from '@/services/api';

// Incluir AsyncStorage para armazenar/recuperar dados no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';

// Incluir os componentes utilizado para estruturar o conteúdo
import { styles } from './styles';

// Feedback visual ao usuário
import Toast from 'react-native-toast-message';

// Componentes
import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { LinkButton } from '@/components/LinkButton';
import { Pagination } from '@/components/Pagination';

// DTO - Data Transfer Object
import { UserDTO } from '@/dtos/UserDTO';
import { PaginationDTO } from '@/dtos/PaginationDTO';


const initialPaginationState: PaginationDTO = {
  page: '1',
  lastPage: '',
  next_page_url: '',
  prev_page_url: false,
};


// Criar e exportar a função com a tela home
export function ListUser() {

  // Armazenar dados
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationDTO>(initialPaginationState);

  // Navegar entre as telas
  const navigation = useNavigation();

  async function handleGetUser(page: any) {

    // Alterar para TRUE e apresentar o loading
    setLoading(true);

    // Recuperar o token
    const token = await AsyncStorage.getItem('@token')
    //console.log(token);

    await api.get(`/users?page=${page}`,
      {
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then((response) => { // Acesso o then quando a API retornar o status de sucesso

        //console.log(response.data.pagination);

        setUsers(response.data.users);
        setPagination(response.data.pagination)

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
      .finally(() => {
        // Alterar para false e ocultar loading
        setLoading(false);
      })
  }

  //useFocusEffect - para executar um efeito quando componente  recebe foco
  //useCallback - A função não será recriada a cada renderização, somente quando houver atualização na dependência
  useFocusEffect(
    useCallback(() => {
      handleGetUser(1);
    }, [])
  )


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          title='Lista de Usuários'
          IconName='account-plus-outline'
          onPress={() => navigation.navigate('addUser')}
        />

        {users.map((user) => {
          return (

            <Pressable
              key={user.id}
              onPress={() => navigation.navigate('userDetails', { userId: user.id })}
            >
              <View style={styles.rowData}>

                <View style={styles.infoData}>
                  <Text style={styles.valueData}>{user.name}</Text>
                </View>

                <LinkButton
                  IconName='greater-than'
                  size={18}
                  color='#c7c7c7'
                  onPress={() => navigation.navigate('userDetails', { userId: user.id })}
                />

              </View>
            </Pressable>
          )
        })}
        <View style={styles.pageContainer}>

          {pagination.prev_page_url &&
            <Pagination
              iconName='chevron-double-left'
              color='#c7c7c7'
              size={24}
              onPress={() => handleGetUser(1)}
            />
          }

          {pagination.prev_page_url &&
            <Pagination
              iconName='chevron-left'
              color='#c7c7c7'
              size={24}
              onPress={() => handleGetUser(+pagination.page - 1)}
            />
          }

          <View style={styles.pageSelected}>
            <Text style={styles.pageTextSelected}>{pagination.page}</Text>
          </View>

          {pagination.next_page_url &&
            <Pagination
              iconName='chevron-right'
              color='#c7c7c7'
              size={24}
              onPress={() => handleGetUser(+pagination.page + 1)}
            />

          }
          {pagination.next_page_url &&
            <Pagination
              iconName='chevron-double-right'
              color='#c7c7c7'
              size={24}
              onPress={() => handleGetUser(pagination.lastPage)}
            />
          }
        </View>

        {
          loading &&
          <Loading />
        }
      </View>
    </ScrollView >
  )
}
