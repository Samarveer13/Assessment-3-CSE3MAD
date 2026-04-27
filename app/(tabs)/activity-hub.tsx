import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const C = {
  primary: "#3B82F6",
  primarySelected: "#EFF6FF",
  textMain: "#111827",
  textSub: "#6B7280",
  card: "#FFFFFF",
  border: "#E5E7EB",
  bg: "#F9FAFB",
};

type ActivityItem = {
  title: string;
  category: string;
  group: string;
  route: string;
};

export default function ActivitiesScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Physics", "Engineering", "Environmental", "Health"];

  const activities: ActivityItem[] = [
    { title: t('activities.parachute'),   category: "Engineering + Physics",          group: "Engineering",   route: "/activities/parachute" },
    { title: t('activities.sound'),       category: "Environmental Science",          group: "Environmental", route: "/activities/sound" },
    { title: t('activities.handfan'),     category: "Physics",                        group: "Physics",       route: "/activities/handfan" },
    { title: t('activities.earthquake'),  category: "Engineering + Earth Science",    group: "Engineering",   route: "/activities/earthquake" },
    { title: t('activities.performance'), category: "Medical Science + Biomechanics", group: "Health",        route: "/activities/performance" },
    { title: t('activities.reaction'),    category: "Neuroscience + Mathematics",     group: "Health",        route: "/activities/reaction" },
    { title: t('activities.breathing'),   category: "Medical Science",                group: "Health",        route: "/activities/breathing" },
  ];

  const filteredActivities =
    selectedFilter === "All"
      ? activities
      : activities.filter(
          (a) => a.group === selectedFilter || a.category.includes(selectedFilter)
        );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 70, paddingBottom: 40 }}
      >
        <Text style={{ fontSize: 18, textAlign: "center", color: C.primary, fontWeight: "600", marginBottom: 30 }}>
          {t('appName')}
        </Text>

        <Text style={{ fontSize: 24, textAlign: "center", fontWeight: "700", color: C.textMain, marginBottom: 18 }}>
          {t('activities.title')}
        </Text>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
          style={{ marginBottom: 20 }}
        >
          <View style={{ flexDirection: "row", backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 4 }}>
            {filters.map((filter, index) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderRadius: 10,
                  marginRight: index === filters.length - 1 ? 0 : 6,
                  backgroundColor: selectedFilter === filter ? C.primarySelected : "transparent",
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: selectedFilter === filter ? "600" : "500", color: selectedFilter === filter ? C.primary : C.textSub }}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Activity list */}
        {filteredActivities.map((activity) => (
          <View
            key={activity.title}
            style={{ backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, paddingVertical: 14, paddingHorizontal: 14, marginBottom: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", color: C.textMain, marginBottom: 4 }}>{activity.title}</Text>
              <Text style={{ fontSize: 13, color: C.textSub }}>{activity.category}</Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push(activity.route as any)}
              style={{ backgroundColor: C.primary, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 }}
            >
              <Text style={{ fontSize: 14, color: "#FFFFFF", fontWeight: "600" }}>{t('common.start')}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
