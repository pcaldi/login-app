//useState - Armazenar estados
// useEffect - Criar efeito colateral em componentes funcionais
import { useEffect, useState } from 'react';

// Incluir os componentes utilizado para estruturar o conteúdo
import { Alert, ScrollView, Text, View } from 'react-native';

// Validar os dados do formulário
import * as yup from 'yup';

// Incluir os componentes utilizado para estilizar o conteúdo
import { styles } from './styles';

// Arquivo com configurações da API
import api from '@/services/api';

// Incluir AsyncStorage para armazenar/recuperar dados no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';

// Criar o campo SELECT
import DropDownPicker from 'react-native-dropdown-picker';

//useNavigation - Navegação entre as telas
import { useNavigation } from '@react-navigation/native';

// Componentes
import { Header } from '@/components/Header';
import { InputForm } from '@/components/InputForm';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';

// Arquivo com validação do formulário
import { validateSchemaForm } from '@/utils/validateSchema';

type SituationProps = {
  id: string;
  nameSituation: string;
  label: string;
  value: string;
}

// Criar e exportar a função com a tela home
export function AddUser() {

  // Armazenar informações nos estados/State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [situationId, setSituationId] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [situations, setSituations] = useState<SituationProps[]>([]);

  // Navegar entre as telas
  const navigation = useNavigation();

  // Processar/submeter os dados do formulário
  const handleAddNewUser = async () => {

    // Usar try e catch para gerenciar exceção/erro
    try { // Permanece no try se não houver nenhum erro

      // Alterar para TRUE e apresentar loading
      setLoading(true);

      // Recuperar o token
      const token = await AsyncStorage.getItem('@token')

      // Validar o formulário com Yup
      await validateSchemaForm.validate({ name, email, password, situationId }, { abortEarly: false });

      // Requisição para a API indicando a rota e os dados
      await api.post('/users', { name, email, password, situationId }, {
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => { // Acessar o then quando a API retornar status sucesso

          Alert.alert("Sucesso", response.data.message);

          // Redirecionar para página listar após o cadastro
          navigation.navigate('listUser');

        }).catch((err) => { // Acessar o catch quando a API retornar status erro

          if (err.response) { // Acessa o IF quando a API retornar erro
            Alert.alert("Ops", err.response.data.message.toString());
          } else { // Acessa o ELSE quando a API não responder
            Alert.alert("Ops", "Erro: Usuário não cadastrado, tente mais tarde!");
          }

        });

    } catch (error) { // Acessa o catch quando houver erro no try

      if (error instanceof yup.ValidationError) { // Acessa o IF quando existir a mensagem de erro
        Alert.alert("Ops", error.errors[0]);
      } else { // Acessa o ELSE quando não existir a mensagem de erro
        Alert.alert("Ops", "Erro: Usuário não cadastrado, tente mais tarde!");
      }
    } finally {

      // Alterar para false e ocultar loading
      setLoading(false);
    }
  }

  // Recuperar as Situations
  const getSituations = async () => {

    // Recuperar o token
    const token = await AsyncStorage.getItem('@token');

    // Requisição para a API indicando a rota e os dados
    await api.get('/situations', {
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        //console.log(response.data.situations);

        // Ler as situações retornadas da API
        var listSituations = response.data.situations.map((situation: SituationProps) => {
          return { label: situation.nameSituation, value: situation.id }
        });

        // Atribuo a variável listSituations para a constante setSituations
        setSituations(listSituations as SituationProps[]);

      })
      .catch((error) => {// Acessa o catch quando a API retornar erro

        if (error.response) { // Acessa o if quando API retornar erro
          Alert.alert("Ops", error.response.data.message)

        } else { // Acessa o ELSE quando a API não responder
          Alert.alert("Ops", "Erro: Tente mais tarde!")
        }

      })
  }

  // Executa quando carregar a tela, e chama a função getSituations();
  useEffect(() => {
    getSituations();
  }, []);


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          title='Cadastrar Usuário'
          IconName='page-first'
          onPress={() => { navigation.goBack() }}
        />
        <View style={styles.formContainer}>
          <View style={styles.formLabel}>

            <Text style={styles.textForm}>* Nome</Text>
          </View>

          <InputForm
            placeholder='Nome completo'
            placeholderTextColor='#F5F5F5'
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
            placeholderTextColor='#F5F5F5'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            returnKeyType='next'
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formLabel}>

            <Text style={styles.textForm}>* Password</Text>
          </View>

          <InputForm
            placeholder='Senha'
            placeholderTextColor='#F5F5F5'
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.formLabel}>
          <Text style={styles.textForm}>* Situações</Text>
        </View>

        <DropDownPicker
          placeholder='Selecione...'
          open={open}
          value={situationId!}
          items={situations}
          setValue={setSituationId}
          setItems={setSituations}
          setOpen={setOpen}
          listMode='SCROLLVIEW'
          dropDownContainerStyle={styles.dropDownContainerStyle}
          style={styles.DropDownPickerStyle}
          textStyle={styles.textStyle}
        />

        <View style={styles.viewRequired}>
          <Text style={styles.txtRequired}>* Campo Obrigatório</Text>
        </View>

        <View style={styles.btnView}>

          <Button title='Cadastrar' disabled={loading} onPress={handleAddNewUser} />
        </View>

        {
          loading &&
          <Loading />
        }
      </View>
    </ScrollView>
  )
}
