import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import { styles } from "./styles";

// Importar ícones
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Para pegar/tipar todos os items que tem na biblioteca
export type IconNameType = keyof typeof MaterialCommunityIcons.glyphMap


// Passo a tipagem para o componente com todas as propriedades do TouchableOpacityProps com o Spread Operator {..rest}
type LinkButtonProps = TouchableOpacityProps & {
  title?: string;
  IconName?: IconNameType;
  size?: number;
  color?: string;
}

export function LinkButton({ title, IconName, color, size, ...rest }: LinkButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} {...rest}>
      <View style={styles.content}>

        <Text style={styles.title}>{title}</Text>

        <MaterialCommunityIcons name={IconName} color={color} size={size} />

      </View>

    </TouchableOpacity>
  );
}
