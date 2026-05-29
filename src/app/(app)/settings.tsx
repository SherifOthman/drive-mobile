import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { PageHeader } from "@/src/components/PageHeader";
import { Ionicons } from "@expo/vector-icons";
import {
  ListGroup,
  Separator,
  Switch,
  Typography,
  useThemeColor,
} from "heroui-native";
import { View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { Uniwind, useUniwind } from "uniwind";

export default function Settings() {
  const { theme } = useUniwind();
  const isDark = theme === "dark";
  const [accent, foreground] = useThemeColor(["accent", "foreground"]);
  const toggleTheme = () => Uniwind.setTheme(isDark ? "light" : "dark");

  return (
    <View className="flex-1 bg-background">
      <PageHeader title="الإعدادات" headingType="h4" />

      <ScreenWrapper className="gap-6">
        <View className="gap-2">
          <Typography.Paragraph
            type="body-sm"
            color="muted"
            className="mr-1 text-right"
          >
            المظهر
          </Typography.Paragraph>
          <ListGroup>
            <ListGroup.Item>
              <ListGroup.ItemPrefix>
                <Switch
                  isSelected={isDark}
                  onSelectedChange={toggleTheme}
                  className="w-14 h-8"
                >
                  <Switch.Thumb className="size-6" />
                  <Switch.StartContent className="left-1.5">
                    {isDark && (
                      <Animated.View entering={ZoomIn.springify()}>
                        <Ionicons name="moon" size={14} color="white" />
                      </Animated.View>
                    )}
                  </Switch.StartContent>
                  <Switch.EndContent className="right-1.5">
                    {!isDark && (
                      <Animated.View entering={ZoomIn.springify()}>
                        <Ionicons name="sunny" size={14} color="white" />
                      </Animated.View>
                    )}
                  </Switch.EndContent>
                </Switch>
              </ListGroup.ItemPrefix>
              <ListGroup.ItemContent>
                <ListGroup.ItemTitle className="text-right">
                  الوضع الليلي
                </ListGroup.ItemTitle>
                <ListGroup.ItemDescription className="text-right">
                  {isDark ? "مفعّل" : "معطّل"}
                </ListGroup.ItemDescription>
              </ListGroup.ItemContent>
              <ListGroup.ItemSuffix>
                <View className="w-9 h-9 rounded-full bg-accent/10 items-center justify-center">
                  <Ionicons
                    name={isDark ? "moon" : "sunny-outline"}
                    size={18}
                    color={accent}
                  />
                </View>
              </ListGroup.ItemSuffix>
            </ListGroup.Item>
          </ListGroup>
        </View>

        <View className="gap-2">
          <Typography.Paragraph
            type="body-sm"
            color="muted"
            className="mr-1 text-right"
          >
            الإشعارات
          </Typography.Paragraph>
          <ListGroup>
            <ListGroup.Item>
              <ListGroup.ItemPrefix>
                <Switch
                  isSelected={true}
                  onSelectedChange={() => {}}
                  className="w-14 h-8"
                >
                  <Switch.Thumb className="size-6" />
                </Switch>
              </ListGroup.ItemPrefix>
              <ListGroup.ItemContent>
                <ListGroup.ItemTitle className="text-right">
                  إشعارات التطبيق
                </ListGroup.ItemTitle>
                <ListGroup.ItemDescription className="text-right">
                  تلقّي الإشعارات
                </ListGroup.ItemDescription>
              </ListGroup.ItemContent>
              <ListGroup.ItemSuffix>
                <View className="w-9 h-9 rounded-full bg-accent/10 items-center justify-center">
                  <Ionicons
                    name="notifications-outline"
                    size={18}
                    color={accent}
                  />
                </View>
              </ListGroup.ItemSuffix>
            </ListGroup.Item>
            <Separator className="mx-4" />
            <ListGroup.Item>
              <ListGroup.ItemPrefix>
                <Switch
                  isSelected={false}
                  onSelectedChange={() => {}}
                  className="w-14 h-8"
                >
                  <Switch.Thumb className="size-6" />
                </Switch>
              </ListGroup.ItemPrefix>
              <ListGroup.ItemContent>
                <ListGroup.ItemTitle className="text-right">
                  إشعارات البريد
                </ListGroup.ItemTitle>
                <ListGroup.ItemDescription className="text-right">
                  تلقّي رسائل البريد
                </ListGroup.ItemDescription>
              </ListGroup.ItemContent>
              <ListGroup.ItemSuffix>
                <View className="w-9 h-9 rounded-full bg-accent/10 items-center justify-center">
                  <Ionicons name="mail-outline" size={18} color={accent} />
                </View>
              </ListGroup.ItemSuffix>
            </ListGroup.Item>
          </ListGroup>
        </View>

        <View className="gap-2">
          <Typography.Paragraph
            type="body-sm"
            color="muted"
            className="mr-1 text-right"
          >
            حول التطبيق
          </Typography.Paragraph>
          <ListGroup>
            <ListGroup.Item>
              <ListGroup.ItemContent>
                <ListGroup.ItemTitle className="text-right">
                  الإصدار
                </ListGroup.ItemTitle>
                <ListGroup.ItemDescription className="text-right">
                  1.0.0
                </ListGroup.ItemDescription>
              </ListGroup.ItemContent>
              <ListGroup.ItemSuffix>
                <View className="w-9 h-9 rounded-full bg-accent/10 items-center justify-center">
                  <Ionicons
                    name="information-circle-outline"
                    size={18}
                    color={accent}
                  />
                </View>
              </ListGroup.ItemSuffix>
            </ListGroup.Item>
            <Separator className="mx-4" />
            <ListGroup.Item>
              <ListGroup.ItemPrefix>
                <Ionicons name="chevron-back" size={18} color={foreground} />
              </ListGroup.ItemPrefix>
              <ListGroup.ItemContent>
                <ListGroup.ItemTitle className="text-right">
                  سياسة الخصوصية
                </ListGroup.ItemTitle>
                <ListGroup.ItemDescription className="text-right">
                  قراءة سياسة الخصوصية
                </ListGroup.ItemDescription>
              </ListGroup.ItemContent>
              <ListGroup.ItemSuffix>
                <View className="w-9 h-9 rounded-full bg-accent/10 items-center justify-center">
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={18}
                    color={accent}
                  />
                </View>
              </ListGroup.ItemSuffix>
            </ListGroup.Item>
          </ListGroup>
        </View>
      </ScreenWrapper>
    </View>
  );
}
