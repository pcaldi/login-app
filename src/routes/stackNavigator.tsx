import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import { ListUser } from "@/screen/ListUser";
import { UserDetails } from "@/screen/UserDetails";
import { AddUser } from "@/screen/AddUser";

const Stack = createNativeStackNavigator()


const StackUserNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="listUser" component={ListUser} />
      <Stack.Screen name="userDetails" component={UserDetails} />
      <Stack.Screen name="addUser" component={AddUser} />
    </Stack.Navigator>
  )
}


export { StackUserNavigation };
