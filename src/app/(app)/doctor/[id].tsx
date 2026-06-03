import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
  Card,
  Chip,
  Separator,
  Skeleton,
  Typography,
  useThemeColor,
} from "heroui-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PageHeader } from "@/src/components/PageHeader";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { useDoctorDetails } from "@/src/features/doctors/hooks/use-doctor-details";
import { useToggleFavorite } from "@/src/features/favorites/hooks/use-favorites";

const DAY_NAMES = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export default function DoctorDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useDoctorDetails(id);
  const toggleFav = useToggleFavorite();
  const [dangerColor, mutedColor] = useThemeColor(["danger", "muted"]);
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper
      isScrollable={false}
      isLoading={isLoading}
      loadingView={
        <View className="gap-4">
          <Skeleton className="w-full h-48 rounded-xl" />
          <Skeleton className="w-2/3 h-6 rounded-lg" />
          <Skeleton className="w-1/2 h-4 rounded-lg" />
        </View>
      }
    >
      <PageHeader title={data?.name ?? ""} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        {data && (
          <View className="gap-5">

            {/* Header card: avatar + name + favorite */}
            <Card>
              <Card.Body className="flex-row-reverse gap-4 p-4 items-center">
                <View className="w-20 h-20 rounded-full bg-default items-center justify-center overflow-hidden">
                  {data.profileImageUrl ? (
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    <View style={{ width: 80, height: 80 }} />
                  ) : (
                    <Typography.Heading type="h3">
                      {data.name.replace(/^د\.?\s*/i, "").charAt(0)}
                    </Typography.Heading>
                  )}
                </View>

                <View className="flex-1 gap-1">
                  <Typography.Heading type="h5" className="text-right">{data.name}</Typography.Heading>
                  <Chip size="sm" variant="secondary" color="default">
                    <Chip.Label>{data.specialization}</Chip.Label>
                  </Chip>
                  <View className="flex-row-reverse items-center gap-1 mt-1">
                    <Ionicons name="star" size={14} color="#facc15" />
                    <Typography.Paragraph type="body-sm" weight="semibold" className="text-yellow-500">
                      {data.averageRating > 0 ? data.averageRating.toFixed(1) : "—"}
                    </Typography.Paragraph>
                    <Typography.Paragraph type="body-sm" color="muted">
                      ({data.totalRatings} تقييم)
                    </Typography.Paragraph>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => toggleFav.mutate(data.id)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons
                    name={data.isFavorite ? "heart" : "heart-outline"}
                    size={26}
                    color={data.isFavorite ? dangerColor : mutedColor}
                  />
                </TouchableOpacity>
              </Card.Body>
            </Card>

            {/* Info row */}
            <View className="flex-row-reverse flex-wrap gap-3">
              {data.visitPrice != null && (
                <InfoChip icon="cash-outline" label={`${data.visitPrice.toLocaleString("ar-EG")} ج.م`} />
              )}
              <InfoChip icon="location-outline" label={`${data.city}، ${data.governorate}`} />
            </View>

            {/* Description */}
            {data.description && (
              <Section title="نبذة">
                <Typography.Paragraph className="text-right leading-6">{data.description}</Typography.Paragraph>
              </Section>
            )}

            {/* Working hours */}
            {data.workingDays.length > 0 && (
              <Section title="مواعيد العمل">
                <View className="gap-2">
                  {data.workingDays.map((wd) => (
                    <View key={wd.day} className="flex-row-reverse items-center justify-between">
                      <Typography.Paragraph weight="semibold">{DAY_NAMES[wd.day]}</Typography.Paragraph>
                      <Typography.Paragraph color="muted">
                        {formatTime(wd.startTime)} – {formatTime(wd.endTime)}
                      </Typography.Paragraph>
                    </View>
                  ))}
                </View>
              </Section>
            )}

            {/* Phone numbers */}
            {data.phoneNumbers.length > 0 && (
              <Section title="للتواصل">
                <View className="gap-2">
                  {data.phoneNumbers.map((p, i) => (
                    <View key={i} className="flex-row-reverse items-center gap-2">
                      <Ionicons name="call-outline" size={16} color={mutedColor} />
                      <Typography.Paragraph>{p.number}</Typography.Paragraph>
                      {p.type && (
                        <Typography.Paragraph type="body-sm" color="muted">({p.type})</Typography.Paragraph>
                      )}
                    </View>
                  ))}
                </View>
              </Section>
            )}

            {/* Address */}
            {data.address && (
              <Section title="العنوان">
                <View className="flex-row-reverse items-center gap-2">
                  <Ionicons name="location-outline" size={16} color={mutedColor} />
                  <Typography.Paragraph className="flex-1 text-right">{data.address}</Typography.Paragraph>
                </View>
              </Section>
            )}

            {/* Branches */}
            {data.branches.length > 0 && (
              <Section title={`الفروع (${data.branches.length})`}>
                <View className="gap-3">
                  {data.branches.map((branch) => (
                    <Card key={branch.id} variant="secondary">
                      <Card.Body className="p-3 gap-2">
                        <Typography.Paragraph weight="bold" className="text-right">{branch.name}</Typography.Paragraph>

                        {branch.address && (
                          <View className="flex-row-reverse items-center gap-2">
                            <Ionicons name="location-outline" size={14} color={mutedColor} />
                            <Typography.Paragraph type="body-sm" color="muted" className="flex-1 text-right">
                              {branch.address}
                            </Typography.Paragraph>
                          </View>
                        )}

                        {branch.phoneNumbers.length > 0 && (
                          <View className="gap-1">
                            {branch.phoneNumbers.map((p, i) => (
                              <View key={i} className="flex-row-reverse items-center gap-2">
                                <Ionicons name="call-outline" size={14} color={mutedColor} />
                                <Typography.Paragraph type="body-sm">{p.number}</Typography.Paragraph>
                              </View>
                            ))}
                          </View>
                        )}

                        {branch.workingDays.length > 0 && (
                          <>
                            <Separator className="my-1" />
                            <View className="gap-1">
                              {branch.workingDays.map((wd) => (
                                <View key={wd.day} className="flex-row-reverse items-center justify-between">
                                  <Typography.Paragraph type="body-sm" weight="semibold">
                                    {DAY_NAMES[wd.day]}
                                  </Typography.Paragraph>
                                  <Typography.Paragraph type="body-sm" color="muted">
                                    {formatTime(wd.startTime)} – {formatTime(wd.endTime)}
                                  </Typography.Paragraph>
                                </View>
                              ))}
                            </View>
                          </>
                        )}
                      </Card.Body>
                    </Card>
                  ))}
                </View>
              </Section>
            )}

          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Helpers ────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Typography.Heading type="h5" className="text-right">{title}</Typography.Heading>
      <Separator />
      {children}
    </View>
  );
}

function InfoChip({ icon, label }: { icon: string; label: string }) {
  const [mutedColor] = useThemeColor(["muted"]);
  return (
    <View className="flex-row-reverse items-center gap-1 bg-default rounded-full px-3 py-1.5">
      <Ionicons name={icon as any} size={14} color={mutedColor} />
      <Typography.Paragraph type="body-sm">{label}</Typography.Paragraph>
    </View>
  );
}

function formatTime(time: string): string {
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? "م" : "ص";
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  return `${hour}:${minute} ${period}`;
}
