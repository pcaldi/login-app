import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '@/screen/Login';
import { NewUser } from '@/screen/NewUser';
import { RecoverPassword } from '@/screen/RecoverPassword';
import { Home } from '@/screen/Home';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    /* Carregar as Screens */
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="newUser" component={NewUser} />
      <Screen name="recoverPassword" component={RecoverPassword} />
      <Screen name="home" component={Home} />
    </Navigator>
  )
}
