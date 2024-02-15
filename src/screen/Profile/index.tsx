
import { View } from 'react-native';

// Incluir os componentes utilizado para estruturar o conteúdo
import { styles } from './styles';

// Componentes
import { Header } from '@/components/Header';

// Criar e exportar a função com a tela home
export function Profile() {

  return (
    <View style={styles.container}>
      <Header title='Perfil' />
    </View>
  )
}
