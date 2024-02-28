// useState - Armazenar estados
//useCallback - A função não será recriada a cada renderização, somente quando houver atualização na dependência
import { useCallback, useState } from 'react';

// Componentes para estruturar o conteúdo
import { View, ScrollView, Text, Image } from 'react-native';

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
import { Button } from '@/components/Button';

// DTO - Data Transfer Object
import { UserDTO } from '@/dtos/UserDTO';

// Criar e exportar a função com a tela home
export function ProfileDetails() {

  // Armazenar dados
  const [user, setUser] = useState<UserDTO>();
  const [loading, setLoading] = useState(false);

  // Navegar entre as telas
  const navigation = useNavigation();

  async function handleGetUser() {

    // Alterar para TRUE e apresentar o loading
    setLoading(true);

    // Recuperar o token
    const token = await AsyncStorage.getItem('@token')
    //console.log(token);

    await api.get('/profile',
      {
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then((response) => { // Acesso o then quando a API retornar o status de sucesso

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
      handleGetUser();
    }, [])
  )


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          title='Perfil'
        />
        {user &&

          <View style={styles.content}>

            <View style={styles.containerImage}>
              <Image
                source={{ uri: user.image }}
                style={styles.image}
              />
            </View>


            <View style={styles.contentView}>
              <Text style={styles.title}>Nome</Text>
              <Text style={styles.subtitle}>{user.name}</Text>
            </View>

            <View style={styles.contentView}>
              <Text style={styles.title}>E-mail</Text>
              <Text style={styles.subtitle}>{user.email}</Text>
            </View>

            <View style={styles.btnView}>
              <Button
                title='Editar Perfil'
                iconName='account-edit-outline'
                onPress={() => { navigation.navigate('editProfile') }}
              />

              <Button
                title='Editar Senha'
                variant='editPassword'
                iconName='lock-reset'
                onPress={() => { navigation.navigate('editPasswordProfile') }}
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
