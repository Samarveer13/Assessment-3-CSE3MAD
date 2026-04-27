import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const C = {
  primary: "#3B82F6",
  textMain: "#111827",
  textSub: "#6B7280",
  card: "#FFFFFF",
  border: "#E5E7EB",
  bg: "#F9FAFB",
};

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 70 }}>
        {/* Header row */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
          <Text style={{ fontSize: 18, color: C.primary, fontWeight: "600", flex: 1, textAlign: "center" }}>
            {t('appName')}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            fontWeight: "700",
            marginBottom: 40,
            color: C.textMain,
          }}
        >
          {t('welcome')}
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/activity-hub" as any)}
          style={{ backgroundColor: C.primary, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginBottom: 12 }}
          accessibilityRole="button"
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>{t('common.startActivity')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/activity-hub" as any)}
          style={{ backgroundColor: C.primary, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginBottom: 12 }}
          accessibilityRole="button"
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>{t('common.upload')}</Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: C.card,
            borderRadius: 14,
            padding: 16,
            marginTop: 20,
            borderWidth: 1,
            borderColor: C.border,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 14, color: C.textSub, marginBottom: 4 }}>{t('common.teamProgress')}</Text>
            <Text style={{ fontSize: 13, color: C.textSub }}>{t('common.experimentsCompleted')}: 6</Text>
          </View>
          <Text style={{ fontSize: 24, fontWeight: "700", color: C.textMain }}>120</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
