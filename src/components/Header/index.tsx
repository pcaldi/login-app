import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { styles } from "./styles";
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Para pegar/tipar todos os items que tem na biblioteca
export type IconNameType = keyof typeof MaterialCommunityIcons.glyphMap

interface HeaderProps extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
  IconName: IconNameType;
}

export function Header({ title, onPress, IconName, ...rest }: HeaderProps) {
  return (

    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.7} {...rest}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name={IconName} color="#F5F5F5" size={28} />
        </View>
      </TouchableOpacity>

    </View >
  )
}
