import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { styles } from "./styles";

import { MaterialCommunityIcons } from "@expo/vector-icons"


type PaginationProps = TouchableOpacityProps & {
  title?: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  color?: string;
  size?: number;
}

export function Pagination({ title, iconName, color, size, ...rest }: PaginationProps) {
  return (

    <TouchableOpacity {...rest} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <MaterialCommunityIcons name={iconName} color={color} size={size} />
    </TouchableOpacity>

  )
}
