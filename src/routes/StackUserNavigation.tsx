import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import { ListUser } from "@/screen/User/ListUser";
import { UserDetails } from "@/screen/User/UserDetails";
import { AddUser } from "@/screen/User/AddUser";
import { EditUser } from "@/screen/User/EditUser";
import { EditPasswordUser } from "@/screen/User/EditPasswordUser"

const Stack = createNativeStackNavigator()


const StackUserNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="listUser" component={ListUser} />
      <Stack.Screen name="userDetails" component={UserDetails} />
      <Stack.Screen name="addUser" component={AddUser} />
      <Stack.Screen name="editUser" component={EditUser} />
      <Stack.Screen name="editPasswordUser" component={EditPasswordUser} />

    </Stack.Navigator>
  )
}

export { StackUserNavigation };
