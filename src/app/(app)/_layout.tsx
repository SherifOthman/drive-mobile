import { Stack } from "expo-router";
import { useThemeColor } from "heroui-native";

export default function AppLayout() {
  const [background] = useThemeColor(["background"]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: background },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="doctor/[id]" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="edit-profile" />
    </Stack>
  );
}
