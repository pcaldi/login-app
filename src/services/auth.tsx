// Incluir AsyncStorage para armazenar dados no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function getValToken() {
  const valueToken = await AsyncStorage.getItem('@token');

  if (valueToken !== null) {
    return valueToken;
  } else {
    return null;

  }
}
