import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacityProps,
} from "react-native";

import { styles } from "./styles";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { variants } from "./variants";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "outline" | "edit" | "delete" | "editPassword";
  style?: TouchableOpacityProps["style"];
}

export function Button({
  title,
  isLoading,
  iconName,
  disabled,
  variant = "primary",
  style,
  ...rest
}: ButtonProps) {
  const buttonVariant = variants[variant];

  const buttonStyle = disabled ? buttonVariant.disabled : buttonVariant.enabled;

  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      style={[styles.container, buttonStyle.button, style]}
      activeOpacity={0.7}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={buttonStyle.icon.color} />
      ) : (
        <View style={styles.content}>
          {iconName && (
            <MaterialCommunityIcons
              style={{ marginRight: 12 }}
              name={iconName}
              size={24}
              color={buttonStyle.icon.color}
            />
          )}
          <Text style={[styles.title, { color: buttonStyle.title.color }]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

