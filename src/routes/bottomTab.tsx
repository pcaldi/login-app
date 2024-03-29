// Importar função para criar a barra de navegação
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// Importar ícones
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Configuração e gestão da  navegação entre
import { StackUserNavigation } from "./StackUserNavigation";
import { StackProfileNavigation } from "./StackProfileNavigation";
import { StackHomeNavigation } from "./StackHomeNavigation";


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
        name="HomeTab"
        component={StackHomeNavigation} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }} />


      <Screen
        name="listUserTab"
        component={StackUserNavigation} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-list" size={size} color={color} />
          ),
        }} />

      <Screen
        name="profileTab"
        component={StackProfileNavigation} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }} />

    </Navigator>
  )
}
