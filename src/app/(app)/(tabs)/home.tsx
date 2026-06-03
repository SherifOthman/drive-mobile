import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMe } from "@/src/features/profile/hooks/use-profile";
import { GreetingHeader } from "@/src/features/home/components/greeting-header";
import { QuickSearchBar } from "@/src/features/home/components/quick-search-bar";
import { CategoryGrid } from "@/src/features/home/components/category-grid";
import { FeaturedDoctorsStrip } from "@/src/features/home/components/featured-doctors-strip";
import { LatestNewsStrip } from "@/src/features/home/components/latest-news-strip";
import { HealthTipBanner } from "@/src/features/home/components/health-tip-banner";
import { SectionHeader } from "@/src/features/home/components/section-header";
import { Surface } from "heroui-native";
import { router } from "expo-router";

export default function Home() {
  const { data: user, isLoading } = useMe();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      {/* Sticky greeting header */}
      <GreetingHeader user={user} isLoading={isLoading} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 110,
          paddingHorizontal: 20,
          paddingTop: 4,
          gap: 28,
        }}
      >
        {/* Search bar */}
        <QuickSearchBar />

        {/* Services grid */}
        <Surface variant="transparent" className="gap-0">
          <SectionHeader title="الخدمات" />
          <Surface variant="secondary" className="rounded-3xl overflow-hidden px-1 py-2">
            <CategoryGrid />
          </Surface>
        </Surface>

        {/* Featured doctors */}
        <FeaturedDoctorsStrip />

        {/* Latest news */}
        <LatestNewsStrip />

        {/* Health tip */}
        <HealthTipBanner />
      </ScrollView>
    </View>
  );
}
