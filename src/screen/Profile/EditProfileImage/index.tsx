//useState - Armazenar estados
// useEffect - Criar efeito colateral em componentes funcionais
import React, { useEffect, useState } from "react";

// Incluir os componentes utilizado para estruturar o conteúdo
import { Alert, Image, TouchableOpacity, View } from "react-native";

// Incluir os componentes utilizado para estilizar o conteúdo
import { styles } from "./styles";

// Biblioteca de ícones
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Biblioteca para buscar imagens na galeria
import * as ImagePicker from "expo-image-picker";

// Componentes
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/Button";

// Navegar entre as telas
import { useNavigation } from "@react-navigation/native";

// Incluir AsyncStorage para armazenar/recuperar dados no dispositivo
import AsyncStorage from "@react-native-async-storage/async-storage";

// Arquivo com configurações da API
import api from "@/services/api";


export function EditProfileImage() {
  // Armazeno os estados
  const [user, setUser] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  // Navegar entre as telas
  const navigation = useNavigation();
  async function getUser() {
    //Alterar para TRUE e apresentar loading
    setLoading(true);

    // Recuperar o token
    const token = await AsyncStorage.getItem('@token');

    // Requisição para a API indicando a rota e os dados
    await api.get('/profile', {
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => { // Acessar o then quando a API retornar status sucesso

        //console.log(response.data.user.image);
        setUser(response.data.user.image);

      })
      .catch((error) => {
        // Acessar o catch quando a API retornar status erro
        Alert.alert("Erro", error.response.data.message)
      })
      .finally(() => {
        // Alterar para FALSE e apresentar loading
        setLoading(false);

      });
  }


  // Função para selecionar a imagem na galeria do dispositivo
  async function handleImagePicker() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      //console.log(imageUri);
    } else {
      Alert.alert("Ops", "Selecione uma imagem");
    }
  }

  async function saveImage() {


    try {
      // Altero para TRUE para apresentar o loading
      setLoading(true);
      // Recupero o token
      const token = await AsyncStorage.getItem('@token');

      const formData = new FormData();

      formData.append('image', JSON.parse(JSON.stringify({
        name: 'image.jpeg',
        uri: image,
        type: 'image/jpeg'
      })));

      //console.log(formData);
      // Requisição para a API indicando a rota e os dados
      await api.put('/profile-image', formData, {
        'headers': {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {// Acessa o then quando a API retornar sucesso
          //console.log(response.data);
          Alert.alert("Sucesso", response.data.message)
          // Navegar para a tela Perfil
          navigation.navigate('profileDetails');
        })
        .catch((error) => {// Acessa o catch quando a API retornar erro

          if (error.response) { // Acessa o if quando API retornar erro
            Alert.alert("Ops", error.response.data.message)

            // Redirecionar para tela Profile
            navigation.navigate('profileDetails');

          } else { // Acessa o ELSE quando a API não responder
            Alert.alert("Ops", "Erro: Usuário não editado, tente mais tarde!")
            // Redirecionar para tela Profile
            navigation.navigate('profileDetails');
          }

        })
        .finally(() => {
          setLoading(false);
        })


    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a imagem do perfil');
      //console.log(error);
    } finally {

      // Altero para FALSE para ocultar o loading
      setLoading(false);;
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <View style={styles.container}>
      <Header
        title="Editar Foto"
        IconName="backburger"
        onPress={() => navigation.goBack()}
      />

      <TouchableOpacity activeOpacity={0.7} onPress={handleImagePicker}>
        <View style={styles.containerImage}>
          <View style={styles.iconView}>
            <MaterialCommunityIcons style={styles.icon} name="camera-flip-outline" />
          </View>


          <Image
            src={image || user}
            style={styles.image}
          />


        </View>
      </TouchableOpacity>

      <View style={styles.btnView}>
        <Button
          title='Salvar'
          iconName='account-edit-outline'
          disabled={loading}
          onPress={saveImage}
        />
      </View>

      {
        loading &&
        <Loading />
      }
    </View>
  );
}
