import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import { Home } from "@/screen/Home"


const Stack = createNativeStackNavigator()


const StackHomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="home" component={Home} />

    </Stack.Navigator>
  )
}

export { StackHomeNavigation };
