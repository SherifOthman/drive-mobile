import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { DoctorsEmptyState } from "@/src/features/doctors/components/doctors-empty-state";
import { RadiologyCard } from "@/src/features/radiology/components/radiology-card";
import { useRadiology } from "@/src/features/radiology/hooks/use-radiology";
import { useDebunce } from "@/src/hooks/useDebunce";
import { router } from "expo-router";
import {
  SearchField,
  Separator,
  Spinner,
  Typography,
} from "heroui-native";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

export default function Radiology() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebunce(searchTerm, 300);

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRadiology({ name: debouncedSearch });

  const allItems = data?.pages.flatMap((p) => p.items) ?? [];
  const isFiltered = !!debouncedSearch;

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleClearFilter = () => setSearchTerm("");

  return (
    <ScreenWrapper isLoading={isLoading} isScrollable={false} bottomPadding={0}>
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row-reverse items-center justify-between">
          <Typography.Heading type="h3">الأشعة</Typography.Heading>
        </View>

        <Separator className="mt-3" />

        {/* Search */}
        <SearchField
          className="mt-3 mb-2"
          value={searchTerm}
          onChange={setSearchTerm}
        >
          <SearchField.Group>
            <SearchField.SearchIcon className="left-auto right-3" />
            <SearchField.Input
              className="pr-9 pl-12"
              style={{ fontFamily: "Cairo" }}
              textAlign="right"
              placeholder="بحث..."
            />
            <SearchField.ClearButton className="right-auto left-3" />
          </SearchField.Group>
        </SearchField>

        {/* List */}
        <FlatList
          data={allItems}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          renderItem={({ item }) => (
            <RadiologyCard
              radiology={item}
              onPress={() => router.push(`/(app)/radiology/${item.id}` as any)}
              className="mt-4"
            />
          )}
          ListEmptyComponent={
            isFetching ? null : (
              <DoctorsEmptyState
                isFiltered={isFiltered}
                onClearFilter={handleClearFilter}
              />
            )
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="py-4 items-center">
                <Spinner />
              </View>
            ) : (
              <View className="h-6" />
            )
          }
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </ScreenWrapper>
  );
}
