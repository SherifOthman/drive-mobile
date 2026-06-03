import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { Surface, Typography, useThemeColor } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";

export function QuickSearchBar() {
  const [mutedColor, accentColor] = useThemeColor(["muted", "accent"]);

  return (
    <Pressable onPress={() => router.push("/(app)/(tabs)/doctors" as any)}>
      <Surface
        variant="secondary"
        className="flex-row-reverse items-center gap-3 px-4 py-3.5 rounded-2xl"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 1,
        }}
      >
        <Surface variant="transparent" className="w-8 h-8 rounded-xl bg-accent/10 items-center justify-center">
          <Ionicons name="search-outline" size={16} color={accentColor} />
        </Surface>
        <Typography.Paragraph color="muted" className="flex-1 text-right">
          ابحث عن طبيب، صيدلية، معمل...
        </Typography.Paragraph>
      </Surface>
    </Pressable>
  );
}
