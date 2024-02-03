import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";


type ButtonProps = TouchableOpacityProps & {
  title: string;

}

export function Button({ title, ...rest }: ButtonProps) {
  return (

    <TouchableOpacity activeOpacity={0.7} style={styles.container}  {...rest} >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity >
  )
}
