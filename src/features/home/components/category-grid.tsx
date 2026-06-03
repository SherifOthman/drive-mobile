import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { PressableFeedback, Surface, Typography } from "heroui-native";
import { View } from "react-native";

type CategoryItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  iconColor: string;
  bgClass: string;
};

const CATEGORIES: CategoryItem[] = [
  { label: "الأطباء",    icon: "people-outline",    route: "/(app)/(tabs)/doctors",    iconColor: "#6366f1", bgClass: "bg-indigo-500/10"  },
  { label: "الصيدليات", icon: "medkit-outline",     route: "/(app)/(tabs)/pharmacies", iconColor: "#10b981", bgClass: "bg-emerald-500/10" },
  { label: "المعامل",   icon: "flask-outline",      route: "/(app)/(tabs)/labs",       iconColor: "#f59e0b", bgClass: "bg-amber-500/10"   },
  { label: "الأشعة",    icon: "scan-outline",       route: "/(app)/(tabs)/radiology",  iconColor: "#3b82f6", bgClass: "bg-blue-500/10"    },
  { label: "الأخبار",   icon: "newspaper-outline",  route: "/(app)/(tabs)/news",       iconColor: "#ec4899", bgClass: "bg-pink-500/10"    },
  { label: "الأقسام",   icon: "grid-outline",       route: "/(app)/(tabs)/categories", iconColor: "#8b5cf6", bgClass: "bg-violet-500/10"  },
];

function CategoryTile({ item }: { item: CategoryItem }) {
  return (
    <PressableFeedback
      onPress={() => router.push(item.route as any)}
      animation={false}
      className="flex-1"
    >
      <PressableFeedback.Scale>
        <View className="items-center gap-2.5 py-3 px-1">
          <Surface
            variant="secondary"
            className={`w-14 h-14 rounded-2xl items-center justify-center ${item.bgClass}`}
          >
            <Ionicons name={item.icon} size={26} color={item.iconColor} />
          </Surface>
          <Typography.Paragraph type="body-xs" weight="semibold" align="center">
            {item.label}
          </Typography.Paragraph>
        </View>
      </PressableFeedback.Scale>
      <PressableFeedback.Ripple />
    </PressableFeedback>
  );
}

export function CategoryGrid() {
  const row1 = CATEGORIES.slice(0, 3);
  const row2 = CATEGORIES.slice(3);

  return (
    <View className="gap-1">
      <View className="flex-row-reverse">
        {row1.map((item) => (
          <CategoryTile key={item.label} item={item} />
        ))}
      </View>
      <View className="flex-row-reverse">
        {row2.map((item) => (
          <CategoryTile key={item.label} item={item} />
        ))}
      </View>
    </View>
  );
}
