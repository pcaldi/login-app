// Adiciona estado para o componente
import { useEffect, useMemo, useState } from 'react';

import { AuthContext } from '@/context/authContext';

// Barra de navegação na parte inferior da tela
import { BottomTab } from './bottomTab';

// Gerencia a navegação, atua como container na pilha de telas
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// AsyncStorage armazena dados no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para validar o token
import { getValToken } from '@/services/auth';

// Telas
import { Login } from '@/screen/Login';
import { NewUser } from '@/screen/NewUser';
import { RecoverPassword } from '@/screen/RecoverPassword';
import { VerifyKey } from '@/screen/VerifyKey';


// Configuração e gestão da  navegação entre telas
const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {

  // Armazenar as informações do usuário
  const [userToken, setUserToken] = useState<string | null>(null);

  // useMemo - memoriza o componente e só executa se tiver o token alterado.
  const authContext = useMemo(() => {
    return {
      // Função signIn será exportada para outras telas
      signIn: async () => {
        const valToken = await AsyncStorage.getItem('@token')
        setUserToken(valToken);
      },
      // Função signOut será exportada para outras telas
      signOut: async () => {
        await AsyncStorage.removeItem('@token');
        await AsyncStorage.removeItem('@name');
        await AsyncStorage.removeItem('@email');
        setUserToken(null);
      }
    }
  }, []);

  const getToken = async () => {
    try {
      const valToken = await getValToken()

      if (valToken !== null) {
        setUserToken(valToken);
      } else {
        setUserToken(null);
      }

    } catch (error) {
      setUserToken(null);
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    // Compartilhar o context de login com as telas
    <AuthContext.Provider value={authContext} >
      {/* /* Carregar as Screens */}

      {userToken ? (

        <BottomTab />

      ) : (
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="login" component={Login} />
          <Screen name="newUser" component={NewUser} />
          <Screen name="recoverPassword" component={RecoverPassword} />
          <Screen name="verifyKey" component={VerifyKey} />

        </Navigator>
      )}

    </AuthContext.Provider>
  )
}
