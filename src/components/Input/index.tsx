
import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

/* Passo a tipagem para o componente, com todas as propriedades do TextInputProps
com o Spread Operator {..rest} */
type Props = TextInputProps & {}

export function Input({ ...rest }: Props) {
  return (

    <TextInput style={styles.input} {...rest} />


  )
}
