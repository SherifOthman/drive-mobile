import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Chip, useThemeColor } from "heroui-native";
import { BusinessDetailScreen } from "@/src/features/businesses/components/business-detail-screen";
import { useDoctorDetails } from "@/src/features/doctors/hooks/use-doctor-details";
import { useToggleFavorite } from "@/src/features/favorites/hooks/use-favorites";

export default function DoctorDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useDoctorDetails(id);
  const toggleFav = useToggleFavorite();
  const [mutedColor] = useThemeColor(["muted"]);

  return (
    <BusinessDetailScreen
      data={data}
      isLoading={isLoading}
      onToggleFavorite={() => data && toggleFav.mutate(data.id)}
      // Specialization chip in the header card
      headerExtra={
        data?.specialization ? (
          <Chip size="sm" variant="secondary" color="default">
            <Chip.Label>{data.specialization}</Chip.Label>
          </Chip>
        ) : undefined
      }
      // Visit price section — doctor-specific
      extraSections={
        data?.visitPrice != null ? (
          <Chip size="sm" variant="secondary">
            <Ionicons name="cash-outline" size={12} color={mutedColor} />
            <Chip.Label>{data.visitPrice.toLocaleString("ar-EG")} ج.م</Chip.Label>
          </Chip>
        ) : undefined
      }
    />
  );
}
