// Importar função para criar a barra de navegação
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importar ícones
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Telas
import { Home } from "@/screen/Home";
import { Profile } from "@/screen/Profile";
import { ListUser } from "@/screen/ListUser";


export function BottomTab() {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#6c7fd8',
      tabBarInactiveTintColor: '#c7c7c7',
      tabBarStyle: {
        backgroundColor: '#1d1d35',
        borderTopWidth: 0
      }
    }}>
      <Screen
        name="home"
        component={Home} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }} />


      <Screen
        name="listUser"
        component={ListUser} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-list" size={size} color={color} />
          ),
        }} />

      <Screen
        name="profile"
        component={Profile} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }} />

    </Navigator>
  )
}