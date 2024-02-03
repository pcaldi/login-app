import { Text, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/Button';

export function RecoverPassword() {

  const navigation = useNavigation();

  function handleLoginScreen() {
    navigation.navigate('home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha!</Text>
      <Button title='Login' onPress={handleLoginScreen} />
    </View>
  );
}

