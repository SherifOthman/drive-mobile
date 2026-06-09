import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { PressableFeedback, Surface, Typography } from "heroui-native";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SectionItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  iconColor: string;
  bgClass: string;
};

const SECTIONS: SectionItem[] = [
  {
    label: "الأطباء",
    icon: "people-outline",
    route: "/(app)/(tabs)/doctors",
    iconColor: "#6366f1",
    bgClass: "bg-indigo-500/10",
  },
  {
    label: "الصيدليات",
    icon: "medkit-outline",
    route: "/(app)/(tabs)/pharmacies",
    iconColor: "#10b981",
    bgClass: "bg-emerald-500/10",
  },
  {
    label: "المعامل",
    icon: "flask-outline",
    route: "/(app)/(tabs)/labs",
    iconColor: "#f59e0b",
    bgClass: "bg-amber-500/10",
  },
  {
    label: "الأشعة",
    icon: "scan-outline",
    route: "/(app)/(tabs)/radiology",
    iconColor: "#3b82f6",
    bgClass: "bg-blue-500/10",
  },
  {
    label: "الأخبار",
    icon: "newspaper-outline",
    route: "/(app)/(tabs)/news",
    iconColor: "#ec4899",
    bgClass: "bg-pink-500/10",
  },
];

function SectionTile({ item }: { item: SectionItem }) {
  return (
    <PressableFeedback
      onPress={() => router.navigate(item.route as any)}
      animation={false}
    >
      <PressableFeedback.Scale>
        <Surface variant="secondary" className="items-center gap-3 py-5 px-2 rounded-2xl">
          <View
            className={`w-14 h-14 rounded-2xl items-center justify-center ${item.bgClass}`}
          >
            <Ionicons name={item.icon} size={26} color={item.iconColor} />
          </View>
          <Typography.Paragraph type="body-sm" weight="bold" align="center">
            {item.label}
          </Typography.Paragraph>
        </Surface>
      </PressableFeedback.Scale>
      <PressableFeedback.Ripple />
    </PressableFeedback>
  );
}

export default function Categories() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 110,
        paddingHorizontal: 20,
        gap: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Typography.Heading type="h4" weight="bold" className="text-right">
        الأقسام
      </Typography.Heading>

      <View className="flex-row flex-wrap" style={{ gap: 12 }}>
        {SECTIONS.map((item) => (
          <View key={item.label} style={{ width: "48%" }}>
            <SectionTile item={item} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
