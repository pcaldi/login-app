// Incluir os componentes utilizado para estruturar o conteúdo
import { Text, View } from 'react-native';

// Incluir os componentes utilizado para estilizar o conteúdo
import { styles } from './styles';

// Navegação entre as telas
import { useNavigation } from '@react-navigation/native';

// Componentes
import { Header } from '@/components/Header';
import { InputForm } from '@/components/InputForm';
import { Button } from '@/components/Button';

// Criar e exportar a função com a tela home
export function AddUser() {

  const navigation = useNavigation();

  return (
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
        />
      </View>

      <View style={styles.viewRequired}>
        <Text style={styles.txtRequired}>* Campo Obrigatório</Text>
      </View>

      <View style={styles.btnView}>

        <Button title='Cadastrar' />
      </View>
    </View>
  )
}
