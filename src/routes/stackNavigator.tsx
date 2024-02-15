import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ListUser } from "@/screen/ListUser";
import { UserDetails } from "@/screen/UserDetails";

const Stack = createNativeStackNavigator()


const StackUserNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="listUser" component={ListUser} />
      <Stack.Screen name="userDetails" component={UserDetails} />
    </Stack.Navigator>
  )
}


export { StackUserNavigation };
