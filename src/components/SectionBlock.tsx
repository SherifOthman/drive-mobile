import { Separator, Typography } from "heroui-native";
import type { ReactNode } from "react";
import { View } from "react-native";

type Props = {
  title: string;
  children: ReactNode;
};

export function SectionBlock({ title, children }: Props) {
  return (
    <View className="gap-3">
      <View className="flex-row-reverse items-center gap-2">
        <Typography.Heading type="h5" weight="semibold" className="text-right">
          {title}{" "}
        </Typography.Heading>
        <Separator className="flex-1" />
      </View>
      {children}
    </View>
  );
}
