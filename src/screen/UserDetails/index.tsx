
import { View } from 'react-native';

// Incluir os componentes utilizado para estruturar o conteúdo
import { styles } from './styles';

// Navegação entre as telas
import { useNavigation } from '@react-navigation/native';

// Componentes
import { Header } from '@/components/Header';

// Criar e exportar a função com a tela home
export function UserDetails() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        title='Detalhes do usuário'
        IconName='page-first'
        onPress={() => { navigation.goBack() }}
      />
    </View>
  )
}
