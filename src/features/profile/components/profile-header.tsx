import { Avatar, Surface, Typography } from "heroui-native";
import { View } from "react-native";

type Props = {
  imageUrl: string | null;
  fullName?: string;
  email?: string;
};

export function ProfileHeader({ imageUrl, fullName, email }: Props) {
  const initial = fullName?.charAt(0) ?? "؟";

  return (
    <View className="items-center gap-4 pt-4 pb-2 w-full">
      {/* Avatar with accent ring */}
      <Surface
        variant="transparent"
        className="p-1 rounded-full bg-accent/15"
        style={{
          shadowColor: "#6366f1",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Avatar size="lg" className="w-24 h-24">
          {imageUrl ? <Avatar.Image source={{ uri: imageUrl }} /> : null}
          <Avatar.Fallback delayMs={200}>{initial}</Avatar.Fallback>
        </Avatar>
      </Surface>

      <View className="items-center gap-1.5">
        <Typography.Heading type="h4" weight="bold" align="center">
          {fullName ?? "المستخدم"}
        </Typography.Heading>

        <Surface variant="secondary" className="rounded-full px-4 py-1.5">
          <Typography.Paragraph type="body-sm" color="muted" align="center">
            {email ?? ""}
          </Typography.Paragraph>
        </Surface>
      </View>
    </View>
  );
}
