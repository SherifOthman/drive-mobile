import { Ionicons } from "@expo/vector-icons";
import { Button, Card, Avatar, Chip, Skeleton, Typography, useThemeColor } from "heroui-native";
import { Image, View } from "react-native";
import { PageHeader } from "@/src/components/PageHeader";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { BranchCard } from "@/src/features/doctors/components/branch-card";
import { DetailSection } from "@/src/features/doctors/components/detail-section";
import { WorkingDayRow } from "@/src/features/doctors/components/working-day-row";
import { nameInitial } from "@/src/utils/arabic";
import type { BusinessDetails } from "@/src/types";

type Props = {
  data: BusinessDetails | undefined;
  isLoading: boolean;
  onToggleFavorite: () => void;
  /** Rendered inside the header card, below the name — for type-specific chips */
  headerExtra?: React.ReactNode;
  /** Rendered after the info chips row — for type-specific sections */
  extraSections?: React.ReactNode;
};

export function BusinessDetailScreen({
  data,
  isLoading,
  onToggleFavorite,
  headerExtra,
  extraSections,
}: Props) {
  const [dangerColor, mutedColor, mutedColor2] = useThemeColor(["danger", "muted", "muted"]);

  return (
    <View className="flex-1 bg-background">
      <PageHeader title={data?.name ?? ""} />

      <ScreenWrapper
        hasHeader
        isLoading={isLoading}
        isScrollable
        bottomPadding={24}
        loadingView={
          <View className="gap-4">
            <Skeleton className="w-full h-32 rounded-xl" />
            <Skeleton className="w-2/3 h-6 rounded-lg" />
            <Skeleton className="w-1/2 h-4 rounded-lg" />
          </View>
        }
        className="px-0"
      >
        {data?.coverImageUrl && (
          <Image
            source={{ uri: data.coverImageUrl }}
            style={{ width: "100%", height: 180 }}
            resizeMode="cover"
          />
        )}

        {data && (
          <View className="px-5 gap-5 pt-4">
            {/* Header card */}
            <Card>
              <Card.Body className="flex-row-reverse gap-4 p-4 items-center">
                <Avatar size="lg">
                  {data.profileImageUrl ? (
                    <Avatar.Image source={{ uri: data.profileImageUrl }} />
                  ) : (
                    <Avatar.Fallback>{nameInitial(data.name)}</Avatar.Fallback>
                  )}
                </Avatar>

                <View className="flex-1 gap-1">
                  <Typography.Heading type="h5" className="text-right">
                    {data.name}
                  </Typography.Heading>
                  {headerExtra}
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

                <Button variant="ghost" size="sm" isIconOnly onPress={onToggleFavorite}>
                  <Ionicons
                    name={data.isFavorite ? "heart" : "heart-outline"}
                    size={26}
                    color={data.isFavorite ? dangerColor : mutedColor}
                  />
                </Button>
              </Card.Body>
            </Card>

            {/* Location chip */}
            <View className="flex-row-reverse flex-wrap gap-2">
              <Chip size="sm" variant="secondary">
                <Ionicons name="location-outline" size={12} color={mutedColor2} />
                <Chip.Label>{data.city}، {data.governorate}</Chip.Label>
              </Chip>
            </View>

            {/* Type-specific extra sections (e.g. price for doctors) */}
            {extraSections}

            {data.description && (
              <DetailSection title="نبذة">
                <Typography.Paragraph className="text-right leading-6">
                  {data.description}
                </Typography.Paragraph>
              </DetailSection>
            )}

            {data.workingDays.length > 0 && (
              <DetailSection title="مواعيد العمل">
                <View className="gap-2">
                  {data.workingDays.map((wd) => (
                    <WorkingDayRow key={wd.day} wd={wd} />
                  ))}
                </View>
              </DetailSection>
            )}

            {data.phoneNumbers.length > 0 && (
              <DetailSection title="للتواصل">
                <View className="gap-2">
                  {data.phoneNumbers.map((p, i) => (
                    <View key={i} className="flex-row-reverse items-center gap-2">
                      <Ionicons name="call-outline" size={16} color={mutedColor} />
                      <Typography.Paragraph>{p.number}</Typography.Paragraph>
                      {p.type && (
                        <Typography.Paragraph type="body-sm" color="muted">
                          ({p.type})
                        </Typography.Paragraph>
                      )}
                    </View>
                  ))}
                </View>
              </DetailSection>
            )}

            {data.address && (
              <DetailSection title="العنوان">
                <View className="flex-row-reverse items-center gap-2">
                  <Ionicons name="location-outline" size={16} color={mutedColor} />
                  <Typography.Paragraph className="flex-1 text-right">
                    {data.address}
                  </Typography.Paragraph>
                </View>
              </DetailSection>
            )}

            {data.branches.length > 0 && (
              <DetailSection title={`الفروع (${data.branches.length})`}>
                <View className="gap-3">
                  {data.branches.map((branch) => (
                    <BranchCard key={branch.id} branch={branch} />
                  ))}
                </View>
              </DetailSection>
            )}
          </View>
        )}
      </ScreenWrapper>
    </View>
  );
}
