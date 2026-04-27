import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import FilteredInput from '@/src/components/FilteredInput';
import { SafeAreaView } from "react-native-safe-area-context";

const C = {
  primary: "#3B82F6",
  textMain: "#111827",
  textSub: "#6B7280",
  card: "#FFFFFF",
  border: "#E5E7EB",
  bg: "#F9FAFB",
};

export default function TeamSetupScreen() {
  const router = useRouter();

  const { t } = useTranslation();
  const [teamName, setTeamName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [teamNameClean, setTeamNameClean] = useState(true);
  const [censoredTeamName, setCensoredTeamName] = useState("");
  const [studentNameClean, setStudentNameClean] = useState(true);
  const [censoredStudentName, setCensoredStudentName] = useState("");

  const years = ["Year 4", "Year 5", "Year 6", "Year 7", "Year 8", "Year 9"];

  const isFormComplete =
    teamName.trim() !== "" &&
    studentName.trim() !== "" &&
    selectedYear !== null;

  function handleCreate() {
    const finalTeamName = teamNameClean ? teamName.trim() : censoredTeamName.trim();
    const finalStudentName = studentNameClean ? studentName.trim() : censoredStudentName.trim();
    router.replace({
      pathname: "/(tabs)",
      params: {
        name: finalStudentName,
        team: finalTeamName,
        year: selectedYear ?? "",
      },
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 20, paddingTop: 70 }}>

        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", marginBottom: 40 }}>
          <Text
            onPress={() => router.back()}
            style={{ fontSize: 20, color: C.primary, marginRight: 10 }}
          >
            ←
          </Text>
          <Text style={{ fontSize: 18, color: C.primary, fontWeight: "600" }}>
            {t('appName')}
          </Text>
        </View>

        <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8, color: C.textMain }}>
          {t('teamSetup.title')}
        </Text>

        <Text style={{ fontSize: 14, color: C.textSub, marginBottom: 30 }}>
          {t('teamSetup.enterDetails')}
        </Text>

        <View style={{ width: "100%" }}>
          <FilteredInput
            placeholder={t('teamSetup.enterName')}
            onChangeText={setTeamName}
            onFilterResult={(clean, censored) => {
              setTeamNameClean(clean);
              setCensoredTeamName(censored);
            }}
          />

          <FilteredInput
            placeholder={t('teamSetup.enterStudent')}
            onChangeText={setStudentName}
            onFilterResult={(clean, censored) => {
              setStudentNameClean(clean);
              setCensoredStudentName(censored);
            }}
          />

          {/* Year picker */}
          <TouchableOpacity
            onPress={() => setOpen(!open)}
            style={{
              backgroundColor: C.card,
              borderRadius: 14,
              borderWidth: 1.5,
              borderColor: C.border,
              paddingVertical: 14,
              paddingHorizontal: 16,
              marginBottom: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, color: selectedYear ? C.textMain : C.textSub }}>
              {selectedYear || "Year Level (e.g. Year 8)"}
            </Text>
            <Text style={{ color: C.textSub, fontSize: 18 }}>{open ? "˄" : "˅"}</Text>
          </TouchableOpacity>

          {open && (
            <View
              style={{
                backgroundColor: C.card,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: C.border,
                marginBottom: 12,
                overflow: "hidden",
              }}
            >
              {years.map((year, index) => (
                <TouchableOpacity
                  key={year}
                  onPress={() => { setSelectedYear(year); setOpen(false); }}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderBottomWidth: index === years.length - 1 ? 0 : 1,
                    borderBottomColor: C.border,
                  }}
                >
                  <Text style={{ fontSize: 14, color: C.textMain }}>{year}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={{ fontSize: 13, color: C.textSub, marginBottom: 20 }}>
            {t('teamSetup.autoId')}
          </Text>

          <TouchableOpacity
            disabled={!isFormComplete}
            onPress={handleCreate}
            style={{
              backgroundColor: isFormComplete
                ? (teamNameClean && studentNameClean) ? C.primary : "#DD6B20"
                : C.border,
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "600" }}>
              {(teamNameClean && studentNameClean) ? t('teamSetup.createTeam') : `${t('teamSetup.createTeam')} (will be filtered)`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
