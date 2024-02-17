// useState - Armazenar estados
// useEffect - Criar efeito colateral em componentes funcionais
import { useEffect, useState } from 'react';

// Componentes para estruturar o conteúdo
import { View, ScrollView, Text } from 'react-native';

// Navegação entre as telas
import { useNavigation } from '@react-navigation/native';

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

// DTO - Data Transfer Object
import { UserDTO } from '@/dtos/UserDTO';


// Criar e exportar a função com a tela home
export function ListUser() {

  // Armazenar dados
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(false);

  // Navegar entre as telas
  const navigation = useNavigation();

  async function handleGetUser() {

    // Alterar para TRUE e apresentar o loading
    setLoading(true);

    // Recuperar o token
    const token = await AsyncStorage.getItem('@token')
    console.log(token);

    await api.get('/users',
      {
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then((response) => { // Acesso o then quando a API retornar o status de sucesso

        //console.log(response.data.users);
        setUsers(response.data.users);

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
  /*
    function handleDetailsUser(userId: string) {
      navigation.navigate('userDetails', { userId });

    }
   */
  useEffect(() => {
    handleGetUser();
  }, []);

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
            <View key={user.id} style={styles.rowData}>
              <View style={styles.infoData}>
                <Text style={styles.valueData}>{user.name}</Text>
              </View>
              <View style={styles.icon}>
                <LinkButton
                  IconName='greater-than'
                  size={18}
                  color='#c7c7c7'
                  onPress={() => navigation.navigate('userDetails', { userId: user.id })}

                />
              </View >

            </View>
          )
        })}

        {
          loading &&
          <Loading />
        }
      </View>
    </ScrollView>
  )
}
