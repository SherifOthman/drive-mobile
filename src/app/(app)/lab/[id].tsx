import { useLocalSearchParams } from "expo-router";
import { BusinessDetailScreen } from "@/src/features/businesses/components/business-detail-screen";
import { useLabDetails } from "@/src/features/laboratories/hooks/use-lab-details";
import { useToggleFavorite } from "@/src/features/favorites/use-favorites";

export default function LabDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, queryKey } = useLabDetails(id);
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
