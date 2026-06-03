import { useLocalSearchParams } from "expo-router";
import { BusinessDetailScreen } from "@/src/features/businesses/components/business-detail-screen";
import { useRadiologyDetails } from "@/src/features/radiology/hooks/use-radiology-details";
import { useToggleFavorite } from "@/src/features/favorites/hooks/use-favorites";

export default function RadiologyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useRadiologyDetails(id);
  const toggleFav = useToggleFavorite();

  return (
    <BusinessDetailScreen
      data={data}
      isLoading={isLoading}
      onToggleFavorite={() => data && toggleFav.mutate(data.id)}
    />
  );
}
