import { ActivityIndicator, View } from "react-native";

import { styles } from "./styles";


export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6c7fd8" />
    </View>
  )
}
