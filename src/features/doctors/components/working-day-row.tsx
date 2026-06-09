import { Typography } from "heroui-native";
import { View } from "react-native";
import { DAY_NAMES, formatTimeStr } from "@/src/arabic";
import type { WorkingDayDetail } from "../api/doctor-details-api";

type Props = {
  wd: WorkingDayDetail;
  size?: "sm" | "md";
};

export function WorkingDayRow({ wd, size = "md" }: Props) {
  return (
    <View className="flex-row-reverse items-center justify-between">
      <Typography.Paragraph type={size === "sm" ? "body-sm" : "body"} weight="semibold">
        {DAY_NAMES[wd.day]}
      </Typography.Paragraph>
      <Typography.Paragraph type={size === "sm" ? "body-sm" : "body"} color="muted">
        {formatTimeStr(wd.startTime)} – {formatTimeStr(wd.endTime)}
      </Typography.Paragraph>
    </View>
  );
}
