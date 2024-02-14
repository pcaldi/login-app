// useContext - Compartilhar dados entre as telas
import { useContext } from 'react';

import { View } from 'react-native';

// Incluir os componentes utilizado para estruturar o conteúdo
import { styles } from './styles';

// Componentes
import { Header } from '@/components/Header';

// Importar o context para deslogar o usuário
import { AuthContext } from '@/context/authContext';

// Criar e exportar a função com a tela home
export function Profile() {

  // Recuperar a função signOut do context
  const { signOut } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Header title='Perfil' IconName='logout' onPress={() => signOut()} />
    </View>
  )
}
