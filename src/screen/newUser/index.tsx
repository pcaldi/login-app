import { Text, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/Button';

export function NewUser() {

  // Navega entre as telas
  const navigation = useNavigation();

  // Função que leva a tela login
  function handleLoginScreen() {
    navigation.navigate('login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Usuário!</Text>
      <Button title='Login' onPress={handleLoginScreen} />
    </View>
  );
}

