import { ScreenWrapper } from "../../components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  SearchField,
  Separator,
  Typography,
  useThemeColor,
} from "heroui-native";
import { View } from "react-native";
import { DoctorCard } from "../../features/doctors/components/doctor-card";

export default function Doctors() {
  const foreground = useThemeColor("foreground");

  return (
    <ScreenWrapper isScrollable isTabPage>
      <View className="flex-row-reverse items-center justify-between">
        <Typography.Heading type="h3">الاطباء</Typography.Heading>

        <Button variant="tertiary" size="sm" isIconOnly>
          <Ionicons name="filter-outline" color={foreground} size={24} />
        </Button>
      </View>

      <Separator className="mt-3" />

      <SearchField className="mt-4">
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

      <DoctorCard
        name="د. حمادة ابراهيم حامولة"
        specialization="باطنة"
        visitPrice={350}
        governorate="القاهرة"
        averageRating={4.5}
        totalRatings={10}
        isOpen
        todaySchedule="٩ صباحاً - ٩ مساءً"
        className="mt-4"
      />
    </ScreenWrapper>
  );
}
