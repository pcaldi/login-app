import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@/screen/home';
import { NewUser } from '@/screen/newUser';
import { RecoverPassword } from '@/screen/recoverPassword';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    /* Carregar as Screens */
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="newUser" component={NewUser} />
      <Screen name="recoverPassword" component={RecoverPassword} />
    </Navigator>
  )
}
