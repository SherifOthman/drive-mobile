import { useLocalSearchParams } from "expo-router";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Separator, Spinner, Surface, Typography } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { PageHeader } from "@/src/components/PageHeader";
import { ReviewCard } from "@/src/features/reviews/components/ReviewCard";
import { useReviews } from "@/src/features/reviews/hooks/use-reviews";
import { useCallback } from "react";

export default function AllReviewsScreen() {
  const { businessId, name } = useLocalSearchParams<{
    businessId: string;
    name?: string;
  }>();
  const insets = useSafeAreaInsets();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useReviews(businessId);

  const reviews = data?.pages.flatMap((p) => p.items) ?? [];
  const total = data?.pages[0]?.totalCount ?? 0;

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <View className="flex-1 bg-background">
      <PageHeader title={name ? `تقييمات ${name}` : "التقييمات"} />

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Spinner />
        </View>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 24,
            flexGrow: 1,
          }}
          ListHeaderComponent={
            total > 0 ? (
              <View className="px-5 py-3 flex-row-reverse items-center gap-1">
                <Ionicons name="star" size={14} color="#f59e0b" />
                <Typography.Paragraph type="body-sm" color="muted">
                  {total} تقييم
                </Typography.Paragraph>
              </View>
            ) : null
          }
          ItemSeparatorComponent={() => <Separator className="mx-5" />}
          renderItem={({ item }) => (
            <Surface variant="transparent">
              <ReviewCard review={item} />
            </Surface>
          )}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Ionicons name="star-outline" size={48} color="#9ca3af" />
              <Typography.Paragraph color="muted" className="mt-3">
                لا توجد تقييمات بعد
              </Typography.Paragraph>
            </View>
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="py-6 items-center">
                <Spinner />
              </View>
            ) : (
              <View className="h-4" />
            )
          }
        />
      )}
    </View>
  );
}
