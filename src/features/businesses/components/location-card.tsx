import { WorkingDayRow } from "@/src/features/doctors/components/working-day-row";
import type { BranchDetail } from "@/src/types";
import { Ionicons } from "@expo/vector-icons";
import { Separator, Surface, Typography } from "heroui-native";
import { Linking, Pressable, View } from "react-native";

type Props = {
  branch: BranchDetail;
  accentColor: string;
  mutedColor: string;
};

export function LocationCard({ branch, accentColor, mutedColor }: Props) {
  const hasContent =
    branch.address ||
    branch.phoneNumbers.length > 0 ||
    branch.workingDays.length > 0;

  if (!hasContent) return null;

  return (
    <Surface variant="secondary" className="rounded-2xl overflow-hidden">
      {branch.address && (
        <Pressable
          onPress={() =>
            Linking.openURL(
              `https://maps.google.com/?q=${encodeURIComponent(branch.address!)}`,
            )
          }
        >
          <View className="flex-row-reverse items-center gap-3 px-4 py-3">
            <View
              className="w-7 h-7 rounded-full items-center justify-center"
              style={{ backgroundColor: accentColor + "22" }}
            >
              <Ionicons name="location-outline" size={14} color={accentColor} />
            </View>
            <Typography.Paragraph type="body-sm" className="flex-1 text-right">
              {branch.address}
            </Typography.Paragraph>
            <Ionicons name="open-outline" size={13} color={mutedColor} />
          </View>
        </Pressable>
      )}

      {branch.phoneNumbers.map((p, i) => (
        <View key={i}>
          {(i > 0 || branch.address) && <Separator className="mx-4" />}
          <Pressable onPress={() => Linking.openURL(`tel:${p.number}`)}>
            <View className="flex-row-reverse items-center gap-3 px-4 py-3">
              <View
                className="w-7 h-7 rounded-full items-center justify-center"
                style={{ backgroundColor: accentColor + "22" }}
              >
                <Ionicons name="call-outline" size={14} color={accentColor} />
              </View>
              <Typography.Paragraph
                type="body-sm"
                className="flex-1 text-right"
              >
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

      {branch.workingDays.length > 0 && (
        <>
          {(branch.address || branch.phoneNumbers.length > 0) && (
            <Separator className="mx-4" />
          )}
          {branch.workingDays.map((wd, i) => (
            <View key={wd.day}>
              <View className="px-4 py-2.5">
                <WorkingDayRow wd={wd} />
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
