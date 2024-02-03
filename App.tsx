import { View, StatusBar } from 'react-native';

import { Routes } from '@/routes';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor="transparent"
      />
    </View>

  );
}


