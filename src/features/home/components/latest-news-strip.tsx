import { router } from "expo-router";
import { FlatList, View } from "react-native";
import { useNews } from "@/src/features/news/hooks/use-news";
import { NewsCardHorizontal } from "@/src/features/news/components/news-card-horizontal";
import { NewsCardHorizontalSkeleton } from "@/src/features/news/components/news-skeleton";
import { SectionHeader } from "./section-header";

export function LatestNewsStrip() {
  const { data, isLoading } = useNews({ pageSize: 6 });
  const articles = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <View>
      <SectionHeader
        title="آخر الأخبار"
        onSeeAll={() => router.push("/(app)/(tabs)/news" as any)}
      />
      {isLoading ? (
        <FlatList
          data={[1, 2, 3]}
          horizontal
          inverted
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => String(i)}
          ItemSeparatorComponent={() => <View className="w-3" />}
          renderItem={() => <NewsCardHorizontalSkeleton />}
        />
      ) : (
        <FlatList
          data={articles}
          horizontal
          inverted
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="w-3" />}
          renderItem={({ item }) => (
            <NewsCardHorizontal
              article={item}
              onPress={() => {/* navigate to article detail */ }}
            />
          )}
          ListEmptyComponent={<View />}
        />
      )}
    </View>
  );
}
