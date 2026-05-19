import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useThemeColor } from "heroui-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppLayout() {
  const [accent, background, border] = useThemeColor([
    "accent",
    "background",
    "border",
  ]);
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "Cairo-Bold",
          fontSize: 11,
        },
        tabBarStyle: {
          backgroundColor: background, // Set your hex code here
          position: "absolute", // Allows content to flow behind
          borderTopWidth: 1, // Removes the top border line
          borderTopColor: border, // Makes the border color transparent
          paddingTop: 5, // Remove top margin
          marginBottom: insets.bottom, // Add bottom margin for safe area
          elevation: 0,
        },
        tabBarActiveTintColor: accent, // Color of the active icon/label
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "الاعدادات",
          tabBarIcon({ color, focused }) {
            return (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={24}
                color={color}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          title: "الاقسام",
          tabBarIcon({ color, focused }) {
            return (
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={24}
                color={color}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="news"
        options={{
          title: "الاخبار",
          tabBarIcon({ color, focused }) {
            return (
              <Ionicons
                name={focused ? "newspaper" : "newspaper-outline"}
                size={24}
                color={color}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="doctors"
        options={{
          title: "الاطباء",
          tabBarIcon({ color, focused }) {
            return (
              <Ionicons
                name={focused ? "people" : "people-outline"}
                size={24}
                color={color}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
