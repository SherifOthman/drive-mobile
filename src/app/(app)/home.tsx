import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { useMe } from "@/src/features/profile/hooks/use-profile";
import { Skeleton, Text } from "heroui-native";
import { View } from "react-native";

export default function Home() {
  const { data, isLoading } = useMe();

  return (
    <ScreenWrapper
      isTabPage
      isScrollable={false}
      isLoading={isLoading}
      loadingView={
        <View className="items-center justify-center gap-3">
          <Skeleton className="w-32 h-8 rounded-lg" />
          <Skeleton className="w-48 h-5 rounded-md" />
          <Skeleton className="w-40 h-4 rounded-md" />
        </View>
      }
      className="items-center justify-center"
    >
      <Text.Heading type="h3" weight="bold">
        مرحباً
      </Text.Heading>
      <Text.Paragraph weight="semibold">{data?.fullName}</Text.Paragraph>
      <Text.Paragraph type="body-sm" color="muted">
        {data?.email}
      </Text.Paragraph>
    </ScreenWrapper>
  );
}
