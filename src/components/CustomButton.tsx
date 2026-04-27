import { Text, TouchableOpacity } from "react-native";
import { useAccessibility } from "../context/AccessibilityContext";
import { commonStyles } from "../styles/commonStyles";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function CustomButton({ title, onPress }: Props) {
  const { colors, fontSize, fontFamily } = useAccessibility();

  return (
    <TouchableOpacity
      style={[commonStyles.button, { backgroundColor: colors.primary }]}
      onPress={onPress}
    >
      <Text
        style={[
          commonStyles.buttonText,
          { fontSize, fontFamily },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
