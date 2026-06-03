import { Ionicons } from "@expo/vector-icons";
import { Surface, Typography, useThemeColor } from "heroui-native";
import { View } from "react-native";
import { WorkingDayRow } from "./working-day-row";
import type { BranchDetail } from "../api/doctor-details-api";

type Props = {
  branch: BranchDetail;
};

export function BranchCard({ branch }: Props) {
  const [mutedColor] = useThemeColor(["muted"]);

  return (
    <Surface variant="secondary" className="rounded-2xl overflow-hidden">
      {branch.address && (
        <View className="flex-row-reverse items-center gap-2 px-4 py-3">
          <Ionicons name="location-outline" size={14} color={mutedColor} />
          <Typography.Paragraph type="body-sm" color="muted" className="flex-1 text-right">
            {branch.address}
          </Typography.Paragraph>
        </View>
      )}

      {branch.phoneNumbers.map((p, i) => (
        <View key={i} className="flex-row-reverse items-center gap-2 px-4 py-3">
          <Ionicons name="call-outline" size={14} color={mutedColor} />
          <Typography.Paragraph type="body-sm">{p.number}</Typography.Paragraph>
        </View>
      ))}

      {branch.workingDays.length > 0 && (
        <>
          <View className="h-px bg-border mx-4" />
          {branch.workingDays.map((wd, i) => (
            <View key={wd.day}>
              <View className="px-4 py-2.5">
                <WorkingDayRow wd={wd} size="sm" />
              </View>
              {i < branch.workingDays.length - 1 && (
                <View className="h-px bg-border mx-4" />
              )}
            </View>
          ))}
        </>
      )}
    </Surface>
  );
}
