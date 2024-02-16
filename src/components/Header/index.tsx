import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { styles } from "./styles";

// Importar ícones
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Para pegar/tipar todos os items que tem na biblioteca
export type IconNameType = keyof typeof MaterialCommunityIcons.glyphMap

/* Passo a tipagem para o componente, com todas as propriedades do TouchableOpacityProps
com o Spread Operator {..rest} */
interface HeaderProps extends TouchableOpacityProps {
  title: string;
  IconName?: IconNameType;
}

export function Header({ title, IconName, ...rest }: HeaderProps) {
  return (

    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity activeOpacity={0.7} {...rest}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name={IconName} color="#C7C7C7" size={32} />
        </View>
      </TouchableOpacity>

    </View >
  )
}
