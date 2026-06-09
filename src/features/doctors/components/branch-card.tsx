import { Ionicons } from "@expo/vector-icons";
import { Separator, Surface, Typography, useThemeColor } from "heroui-native";
import { Linking, Pressable, View } from "react-native";
import { WorkingDayRow } from "./working-day-row";
import type { BranchDetail } from "../api/doctor-details-api";

type Props = {
  branch: BranchDetail;
};

export function BranchCard({ branch }: Props) {
  const [mutedColor, accentColor] = useThemeColor(["muted", "accent"]);

  const openMap = (address: string) => {
    Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(address)}`);
  };

  return (
    <Surface variant="secondary" className="rounded-2xl overflow-hidden">
      {/* Tappable address — opens Google Maps */}
      {branch.address && (
        <Pressable onPress={() => openMap(branch.address!)}>
          <View className="flex-row-reverse items-center gap-2 px-4 py-3">
            <Ionicons name="location-outline" size={14} color={accentColor} />
            <Typography.Paragraph type="body-sm" className="flex-1 text-right">
              {branch.address}
            </Typography.Paragraph>
            <Ionicons name="open-outline" size={13} color={mutedColor} />
          </View>
        </Pressable>
      )}

      {/* Tappable phone numbers — opens dialer */}
      {branch.phoneNumbers.map((p, i) => (
        <View key={i}>
          {(i > 0 || branch.address) && <Separator className="mx-4" />}
          <Pressable onPress={() => Linking.openURL(`tel:${p.number}`)}>
            <View className="flex-row-reverse items-center gap-2 px-4 py-3">
              <Ionicons name="call-outline" size={14} color={accentColor} />
              <Typography.Paragraph type="body-sm" className="flex-1">
                {p.number}
              </Typography.Paragraph>
              {p.type && (
                <Typography.Paragraph type="body-xs" color="muted">
                  {p.type}
                </Typography.Paragraph>
              )}
            </View>
          </Pressable>
        </View>
      ))}

      {/* Working days */}
      {branch.workingDays.length > 0 && (
        <>
          <Separator className="mx-4" />
          {branch.workingDays.map((wd, i) => (
            <View key={wd.day}>
              <View className="px-4 py-2.5">
                <WorkingDayRow wd={wd} size="sm" />
              </View>
              {i < branch.workingDays.length - 1 && (
                <Separator className="mx-4" />
              )}
            </View>
          ))}
        </>
      )}
    </Surface>
  );
}
