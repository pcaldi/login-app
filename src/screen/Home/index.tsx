
// Incluir os componentes utilizado para estruturar o conteúdo
import { Text, View } from 'react-native';
import { styles } from './styles';
import { Header } from '@/components/Header';

// Criar e exportar a função com a tela home
export function Home() {


  return (
    <View style={styles.container}>
      <Header title='Home' IconName='account-clock' />
    </View>
  )
}
