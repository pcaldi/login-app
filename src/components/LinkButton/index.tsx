import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";

// Passo a tipagem para o componente com todas as propriedades do TouchableOpacityProps com o Spread Operator {..rest}
type LinkButtonProps = TouchableOpacityProps & {
  title: string;
}

export function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
