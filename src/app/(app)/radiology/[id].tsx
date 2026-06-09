import { useLocalSearchParams } from "expo-router";
import { BusinessDetailScreen } from "@/src/features/businesses/components/business-detail-screen";
import { useRadiologyDetails } from "@/src/features/radiology/hooks/use-radiology-details";
import { useToggleFavorite } from "@/src/features/favorites/use-favorites";

export default function RadiologyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, queryKey } = useRadiologyDetails(id);
  const toggleFav = useToggleFavorite();

  return (
    <BusinessDetailScreen
      data={data}
      isLoading={isLoading}
      queryKey={queryKey}
      onToggleFavorite={() => data && toggleFav.mutate(data.id)}
    />
  );
}
