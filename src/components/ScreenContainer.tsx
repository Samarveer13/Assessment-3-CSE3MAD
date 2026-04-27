import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAccessibility } from "../context/AccessibilityContext";

type Props = {
  children: ReactNode;
};

export default function ScreenContainer({ children }: Props) {
  const { colors } = useAccessibility();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, backgroundColor: colors.bg }}>{children}</View>
    </SafeAreaView>
  );
}

