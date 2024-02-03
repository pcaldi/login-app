import { Text, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/Button';

export function NewUser() {

  const navigation = useNavigation();

  function handleLoginScreen() {
    navigation.navigate('home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Usuário!</Text>
      <Button title='Login' onPress={handleLoginScreen} />
    </View>
  );
}

