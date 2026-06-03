import { Ionicons } from "@expo/vector-icons";
import { ListGroup, Separator, useThemeColor } from "heroui-native";
import { View } from "react-native";

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  description?: string;
  onPress?: () => void;
};

type Props = {
  menuItems: MenuItem[];
  logoutItem: { onPress: () => void };
};

export function ProfileMenu({ menuItems, logoutItem }: Props) {
  const [accent, danger] = useThemeColor(["accent", "danger"]);

  return (
    <View className="w-full gap-4">
      {/* Main menu */}
      <ListGroup>
        {menuItems.map((item, index) => (
          <View key={index}>
            {index > 0 && <Separator className="mx-4" />}
            <ListGroup.Item onPress={item.onPress}>
              {/* Icon badge on the right (RTL — acts as prefix visually) */}
              <View className="w-9 h-9 rounded-xl bg-accent/10 items-center justify-center">
                <Ionicons name={item.icon} size={18} color={accent} />
              </View>
              <ListGroup.ItemContent>
                <ListGroup.ItemTitle className="text-right">
                  {item.label}
                </ListGroup.ItemTitle>
                {item.description && (
                  <ListGroup.ItemDescription className="text-right">
                    {item.description}
                  </ListGroup.ItemDescription>
                )}
              </ListGroup.ItemContent>
              <ListGroup.ItemSuffix className="rotate-180" />
            </ListGroup.Item>
          </View>
        ))}
      </ListGroup>

      {/* Logout — separate group for visual separation */}
      <ListGroup>
        <ListGroup.Item onPress={logoutItem.onPress}>
          <View className="w-9 h-9 rounded-xl bg-danger/10 items-center justify-center">
            <Ionicons name="log-out-outline" size={18} color={danger} />
          </View>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle className="text-danger text-right">
              تسجيل الخروج
            </ListGroup.ItemTitle>
          </ListGroup.ItemContent>
        </ListGroup.Item>
      </ListGroup>
    </View>
  );
}
