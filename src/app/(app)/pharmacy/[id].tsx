import { useLocalSearchParams } from "expo-router";
import { BusinessDetailScreen } from "@/src/features/businesses/components/business-detail-screen";
import { usePharmacyDetails } from "@/src/features/pharmacies/hooks/use-pharmacy-details";
import { useToggleFavorite } from "@/src/features/favorites/use-favorites";

export default function PharmacyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, queryKey } = usePharmacyDetails(id);
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
