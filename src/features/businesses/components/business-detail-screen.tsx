import { Ionicons } from "@expo/vector-icons";
import {
  Alert, Avatar, Button, Card, Chip, Skeleton,
  Surface, Typography, useThemeColor,
} from "heroui-native";
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
  headerExtra?: React.ReactNode;
  extraSections?: React.ReactNode;
};

export function BusinessDetailScreen({
  data,
  isLoading,
  onToggleFavorite,
  headerExtra,
  extraSections,
}: Props) {
  const [dangerColor, mutedColor] = useThemeColor(["danger", "muted"]);

  return (
    <Surface variant="default" className="flex-1">
      <PageHeader title={data?.name ?? ""} />

      <ScreenWrapper
        hasHeader
        isLoading={isLoading}
        isScrollable
        bottomPadding={40}
        loadingView={
          <Surface variant="transparent" className="gap-4 px-5 pt-4">
            <Skeleton className="w-full h-40 rounded-2xl" />
            <Skeleton className="w-2/3 h-6 rounded-xl" />
            <Skeleton className="w-1/2 h-4 rounded-xl" />
            <Skeleton className="w-full h-24 rounded-2xl" />
          </Surface>
        }
        className="px-0"
      >
        {/* Cover image */}
        {data?.coverImageUrl && (
          <Image
            source={{ uri: data.coverImageUrl }}
            style={{ width: "100%", height: 200 }}
            resizeMode="cover"
          />
        )}

        {data && (
          <Surface variant="transparent" className="px-5 gap-5 pt-5">

            {/* ── Hero card ───────────────────── */}
            <Card>
              <Card.Body className="flex-row-reverse gap-4 p-4 items-center">
                <Avatar size="lg">
                  {data.profileImageUrl ? (
                    <Avatar.Image source={{ uri: data.profileImageUrl }} />
                  ) : (
                    <Avatar.Fallback>{nameInitial(data.name)}</Avatar.Fallback>
                  )}
                </Avatar>

                <Surface variant="transparent" className="flex-1 gap-1">
                  <Typography.Heading type="h5" weight="bold" className="text-right">
                    {data.name}
                  </Typography.Heading>
                  {headerExtra}
                  <Surface variant="transparent" className="flex-row-reverse items-center gap-1 mt-0.5">
                    <Ionicons name="star" size={13} color="#f59e0b" />
                    <Typography.Paragraph type="body-sm" weight="bold" className="text-amber-500">
                      {data.averageRating > 0 ? data.averageRating.toFixed(1) : "—"}
                    </Typography.Paragraph>
                    <Typography.Paragraph type="body-xs" color="muted">
                      ({data.totalRatings} تقييم)
                    </Typography.Paragraph>
                  </Surface>
                </Surface>

                <Button
                  variant="ghost"
                  size="sm"
                  isIconOnly
                  onPress={onToggleFavorite}
                  className={data.isFavorite ? "bg-danger/10" : ""}
                >
                  <Ionicons
                    name={data.isFavorite ? "heart" : "heart-outline"}
                    size={24}
                    color={data.isFavorite ? dangerColor : mutedColor}
                  />
                </Button>
              </Card.Body>
            </Card>

            {/* ── Location chip ───────────────── */}
            <Surface variant="transparent" className="flex-row-reverse flex-wrap gap-2">
              <Chip size="sm" variant="secondary">
                <Ionicons name="location-outline" size={12} color={mutedColor} />
                <Chip.Label>{data.city}، {data.governorate}</Chip.Label>
              </Chip>
            </Surface>

            {extraSections}

            {/* ── Description ─────────────────── */}
            {data.description && (
              <DetailSection title="نبذة">
                <Typography.Paragraph className="text-right leading-7" color="muted">
                  {data.description}
                </Typography.Paragraph>
              </DetailSection>
            )}

            {/* ── Working hours ────────────────── */}
            {data.workingDays.length > 0 && (
              <DetailSection title="مواعيد العمل">
                <Surface variant="secondary" className="rounded-2xl overflow-hidden">
                  {data.workingDays.map((wd, i) => (
                    <Surface key={wd.day} variant="transparent">
                      <Surface variant="transparent" className="px-4 py-3">
                        <WorkingDayRow wd={wd} />
                      </Surface>
                      {i < data.workingDays.length - 1 && (
                        <View className="h-px bg-border mx-4" />
                      )}
                    </Surface>
                  ))}
                </Surface>
              </DetailSection>
            )}

            {/* ── Phone numbers ────────────────── */}
            {data.phoneNumbers.length > 0 && (
              <DetailSection title="للتواصل">
                <Surface variant="transparent" className="gap-2">
                  {data.phoneNumbers.map((p, i) => (
                    <Surface key={i} variant="secondary" className="flex-row-reverse items-center gap-3 px-4 py-3 rounded-xl">
                      <Surface variant="transparent" className="w-8 h-8 rounded-full bg-accent/10 items-center justify-center">
                        <Ionicons name="call-outline" size={15} color="#6366f1" />
                      </Surface>
                      <Surface variant="transparent" className="flex-1 items-end">
                        <Typography.Paragraph weight="medium">{p.number}</Typography.Paragraph>
                        {p.type && (
                          <Typography.Paragraph type="body-xs" color="muted">{p.type}</Typography.Paragraph>
                        )}
                      </Surface>
                    </Surface>
                  ))}
                </Surface>
              </DetailSection>
            )}

            {/* ── Address ─────────────────────── */}
            {data.address && (
              <DetailSection title="العنوان">
                <Alert status="default" className="rounded-2xl">
                  <Alert.Indicator>
                    <Ionicons name="location-outline" size={18} color={mutedColor} />
                  </Alert.Indicator>
                  <Alert.Content>
                    <Alert.Description className="text-right">{data.address}</Alert.Description>
                  </Alert.Content>
                </Alert>
              </DetailSection>
            )}

            {/* ── Branches ────────────────────── */}
            {data.branches.length > 0 && (
              <DetailSection title={`الفروع (${data.branches.length})`}>
                <Surface variant="transparent" className="gap-3">
                  {data.branches.map((branch) => (
                    <BranchCard key={branch.id} branch={branch} />
                  ))}
                </Surface>
              </DetailSection>
            )}

          </Surface>
        )}
      </ScreenWrapper>
    </Surface>
  );
}
