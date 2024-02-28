// useContext - Compartilhar dados entre as telas
import { useCallback, useContext, useState } from 'react';

import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Incluir os componentes utilizado para estruturar o conteúdo
import { styles } from './styles';

//useFocusEffect - para executar um efeito quando componente  recebe foco
// Navegação entre as telas
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Arquivo com configurações da API
import api from '@/services/api';

// Incluir AsyncStorage para armazenar/recuperar dados no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';


// Biblioteca de ícones
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Componentes
import { Header } from '@/components/Header';

// Importar o context para deslogar o usuário
import { AuthContext } from '@/context/authContext';


// Criar e exportar a função com a tela home
export function Home() {

  // Armazenar informações nos estados/State
  const [countUser, setCountUser] = useState([]);
  const [loading, setLoading] = useState(false);

  // Recuperar a função signOut do context
  const { signOut } = useContext(AuthContext);

  // Navegar entre as telas
  const navigation = useNavigation();


  const getQuantity = async () => {

    // Alterar para TRUE e apresentar o loading
    setLoading(true);

    // Recuperar o token
    const token = await AsyncStorage.getItem('@token')
    //console.log(token);

    await api.get("/quantity",
      {
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then((response) => { // Acesso o then quando a API retornar o status de sucesso

        //console.log(response.data);

        setCountUser(response.data.counterUsers);

      })
      .catch((err) => { // Acesso o then quando a API retornar o status de erro

        if (err.response) {
          // Feedback visual ao usuário

          Alert.alert("Ops", err.response.data.message.toString())

        } else {
          // Feedback visual ao usuário
          Alert.alert("Ops", "Tente novamente mais tarde")
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
      getQuantity()
    }, [])
  )

  return (
    <View style={styles.container}>
      <Header title='Home' IconName='logout' onPress={() => signOut()} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

        <TouchableOpacity style={styles.content} onPress={() => { navigation.navigate('listUserTab') }}>
          <View style={styles.contentView}>
            <MaterialCommunityIcons name='account-group' color={'#f5f5f5'} size={30} />
            <Text style={styles.title}>{countUser} Usuários</Text>
          </View>
        </TouchableOpacity>


      </ScrollView>
    </View>
  )

}
