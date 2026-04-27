import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/src/i18n';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ── Local types (mirrors AccessibilityContext in the main app) ────────────────

type TextSize = "small" | "medium" | "large" | "xlarge";
type TextStyle = "default" | "serif" | "mono";

interface ThemeColors {
  primary: string;
  primarySelected: string;
  textMain: string;
  textSub: string;
  card: string;
  border: string;
  sectionLabel: string;
  toggleTrack: string;
  background: string;
}

const FONT_FAMILY_MAP: Record<TextStyle, string | undefined> = {
  default: undefined,
  serif: "serif",
  mono: "monospace",
};

const FONT_SIZE_MAP: Record<TextSize, number> = {
  small: 12,
  medium: 14,
  large: 17,
  xlarge: 20,
};

const LIGHT: ThemeColors = {
  primary: "#3B82F6",
  primarySelected: "#EFF6FF",
  textMain: "#111827",
  textSub: "#6B7280",
  card: "#FFFFFF",
  border: "#E5E7EB",
  sectionLabel: "#9CA3AF",
  toggleTrack: "#3B82F6",
  background: "#F9FAFB",
};

const DARK: ThemeColors = {
  primary: "#60A5FA",
  primarySelected: "#1E3A5F",
  textMain: "#F9FAFB",
  textSub: "#9CA3AF",
  card: "#1F2937",
  border: "#374151",
  sectionLabel: "#6B7280",
  toggleTrack: "#60A5FA",
  background: "#111827",
};

const HIGH_CONTRAST: ThemeColors = {
  primary: "#1D4ED8",
  primarySelected: "#DBEAFE",
  textMain: "#000000",
  textSub: "#374151",
  card: "#FFFFFF",
  border: "#000000",
  sectionLabel: "#374151",
  toggleTrack: "#1D4ED8",
  background: "#FFFFFF",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ label, color }: { label: string; color: string }) {
  return (
    <Text style={[styles.sectionHeader, { color }]}>{label.toUpperCase()}</Text>
  );
}

interface ToggleRowProps {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  colors: ThemeColors;
}
function ToggleRow({ label, description, value, onValueChange, colors }: ToggleRowProps) {
  return (
    <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.rowText}>
        <Text style={[styles.rowLabel, { color: colors.textMain }]}>{label}</Text>
        <Text style={[styles.rowDesc, { color: colors.textSub }]}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D1D5DB", true: colors.toggleTrack }}
        thumbColor="#FFFFFF"
        accessibilityLabel={label}
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
      />
    </View>
  );
}

interface ChipGroupProps<T extends string> {
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (v: T) => void;
  colors: ThemeColors;
  previewFont?: (value: T) => string | undefined;
}
function ChipGroup<T extends string>({
  options, selected, onSelect, colors, previewFont,
}: ChipGroupProps<T>) {
  return (
    <View style={styles.chipRow}>
      {options.map(({ value, label }) => {
        const isSelected = value === selected;
        return (
          <TouchableOpacity
            key={value}
            onPress={() => onSelect(value)}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? colors.primary : colors.card,
                borderColor: isSelected ? colors.primary : colors.border,
              },
            ]}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={label}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color: isSelected ? "#FFFFFF" : colors.textMain,
                  fontFamily: previewFont ? previewFont(value) : undefined,
                },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

const TEXT_SIZE_OPTIONS: { value: TextSize; label: string }[] = [
  { value: "small", label: "S" },
  { value: "medium", label: "M" },
  { value: "large", label: "L" },
  { value: "xlarge", label: "XL" },
];

const TEXT_STYLE_OPTIONS: { value: TextStyle; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Mono" },
];

export default function SettingsScreen() {
  const { t, i18n: lang } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [textStyle, setTextStyle] = useState<TextStyle>("default");
  const [textSize, setTextSize] = useState<TextSize>("medium");

  const colors = highContrast ? HIGH_CONTRAST : darkMode ? DARK : LIGHT;
  const fontSize = FONT_SIZE_MAP[textSize];
  const fontFamily = FONT_FAMILY_MAP[textStyle];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.appTitle, { color: colors.primary }]}>STEMM Lab</Text>
        <Text style={[styles.pageTitle, { color: colors.textMain }]}>Settings</Text>

        {/* ── Display ── */}
        <SectionHeader label="Display" color={colors.sectionLabel} />

        <ToggleRow
          label="Dark Mode"
          description="Switch to a Dark Colour Scheme"
          value={darkMode}
          onValueChange={setDarkMode}
          colors={colors}
        />

        <ToggleRow
          label="High Contrast"
          description="Increase Contrast for Better Readability"
          value={highContrast}
          onValueChange={setHighContrast}
          colors={colors}
        />

        {/* ── Text ── */}
        <SectionHeader label="Text" color={colors.sectionLabel} />

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.rowLabel, { color: colors.textMain, marginBottom: 4 }]}>
            Text Size
          </Text>
          <Text style={[styles.rowDesc, { color: colors.textSub, marginBottom: 12 }]}>
            Adjust how Large Text Appears Across the App
          </Text>
          <ChipGroup
            options={TEXT_SIZE_OPTIONS}
            selected={textSize}
            onSelect={setTextSize}
            colors={colors}
          />
          <Text
            style={[
              styles.previewText,
              { color: colors.textSub, fontSize, fontFamily, borderColor: colors.border },
            ]}
          >
            Preview — The Quick Brown Fox Jumps Over The Lazy Dog.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.rowLabel, { color: colors.textMain, marginBottom: 4 }]}>
            Text Style
          </Text>
          <Text style={[styles.rowDesc, { color: colors.textSub, marginBottom: 12 }]}>
            Choose the Typeface Used Throughout the App
          </Text>
          <ChipGroup
            options={TEXT_STYLE_OPTIONS}
            selected={textStyle}
            onSelect={setTextStyle}
            colors={colors}
            previewFont={(v) => FONT_FAMILY_MAP[v]}
          />
          <Text
            style={[
              styles.previewText,
              { color: colors.textSub, fontSize, fontFamily, borderColor: colors.border },
            ]}
          >
            Preview — The Quick Brown Fox Jumps Over The Lazy Dog.
          </Text>
        </View>

        {/* ── Notifications ── */}
        <SectionHeader label="Notifications" color={colors.sectionLabel} />

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.rowLabel, { color: colors.textMain, marginBottom: 2 }]}>
            Test Notification
          </Text>
          <Text style={[styles.rowDesc, { color: colors.textSub, marginBottom: 16 }]}>
            Send a local notification to verify alerts are working
          </Text>
          <TouchableOpacity
            onPress={() => Alert.alert("STEMM Lab", "Notification is working!")}
            style={[styles.logoutButton, { borderColor: colors.primary }]}
            accessibilityRole="button"
            accessibilityLabel="Test notification"
          >
            <Text style={[styles.logoutText, { color: colors.primary }]}>Send Test Notification</Text>
          </TouchableOpacity>
        </View>

        {/* ── Language — Feature 2: Translations ── */}
        <SectionHeader label="Language" color={colors.sectionLabel} />
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.rowLabel, { color: colors.textMain, marginBottom: 4 }]}>
            App Language
          </Text>
          <Text style={[styles.rowDesc, { color: colors.textSub, marginBottom: 12 }]}>
            Switch the interface language — powered by i18next + react-i18next
          </Text>
          <View style={styles.chipRow}>
            {LANGUAGES.map(({ code, label, flag }) => {
              const isSelected = lang.language === code;
              return (
                <TouchableOpacity
                  key={code}
                  onPress={() => lang.changeLanguage(code)}
                  style={[styles.chip, {
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                  }]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={label}
                >
                  <Text style={[styles.chipText, { color: isSelected ? '#fff' : colors.textMain }]}>
                    {flag}  {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* Live translation preview */}
          <View style={{ marginTop: 14, padding: 12, backgroundColor: colors.background, borderRadius: 10, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ fontSize: 11, color: colors.sectionLabel, fontWeight: '700', letterSpacing: 1, marginBottom: 8 }}>
              LIVE PREVIEW
            </Text>
            <Text style={{ fontSize: 17, fontWeight: '700', color: colors.textMain, marginBottom: 2 }}>
              {t('welcome')}
            </Text>
            <Text style={{ fontSize: 12, color: colors.textSub, marginBottom: 10 }}>
              {t('tagline')}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {[t('common.start'), t('common.results'), t('tabs.leaderboard'), t('activities.reaction')].map((label) => (
                <View key={label} style={{ backgroundColor: colors.primarySelected, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 }}>
                  <Text style={{ fontSize: 12, color: colors.primary, fontWeight: '500' }}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── Account ── */}
        <SectionHeader label="Account" color={colors.sectionLabel} />

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.rowLabel, { color: colors.textMain, marginBottom: 2 }]}>
            Demo Student
          </Text>
          <Text style={[styles.rowDesc, { color: colors.textSub, marginBottom: 16 }]}>
            demo@stemm.edu
          </Text>
          <TouchableOpacity
            onPress={() => Alert.alert("Log Out", "Logged out.")}
            style={[styles.logoutButton, { borderColor: "#F87171" }]}
            accessibilityRole="button"
            accessibilityLabel="Log out"
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  appTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 28,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  rowText: { flex: 1, marginRight: 12 },
  rowLabel: { fontSize: 15, fontWeight: "600", marginBottom: 2 },
  rowDesc: { fontSize: 12 },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  chipText: { fontSize: 13, fontWeight: "600" },
  previewText: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    lineHeight: 22,
  },
  logoutButton: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  logoutText: {
    color: "#DC2626",
    fontWeight: "600",
    fontSize: 15,
  },
});
