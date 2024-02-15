// useState - Armazenar estados
// useEffect - Criar efeito colateral em componentes funcionais
import { useEffect, useState } from 'react';

// Componentes para estruturar o conteúdo
import { View, ScrollView, Text } from 'react-native';

// Arquivo com configurações da API
import api from '@/services/api';

// Incluir os componentes utilizado para estruturar o conteúdo
import { styles } from './styles';

// Feedback visual ao usuário
import Toast from 'react-native-toast-message';

// Componentes
import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { UserDTO } from '@/dtos/UserDTO';
import { LinkButton } from '@/components/LinkButton';

// Criar e exportar a função com a tela home
export function ListUser() {

  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(false);


  async function handleGetUser() {

    // Alterar para TRUE e apresentar o loading
    setLoading(true);

    await api.get('/users')
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

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header title='Lista de Usuários' />

        {users.map((user) => {
          return (
            <View key={user.id} style={styles.rowData}>
              <View style={styles.infoData}>
                <Text style={styles.valueData}>{user.name}</Text>
              </View>
              <View style={styles.icon}>
                <LinkButton IconName='greater-than' size={18} color='#c7c7c7' />
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
