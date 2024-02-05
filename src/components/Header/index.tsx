import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { MaterialCommunityIcons } from '@expo/vector-icons'


type HeaderProps = {
  title: string;
  onPress: () => void;
}

export function Header({ title, onPress }: HeaderProps) {
  return (

    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.icon}>
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
          <MaterialCommunityIcons name="logout" color="#F5F5F5" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
