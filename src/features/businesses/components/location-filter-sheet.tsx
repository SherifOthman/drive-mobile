import { ScrollableSelectContent } from "@/src/components/ScrollableSelectContent";
import { BottomSheet, Button, Select } from "heroui-native";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { useCities, useGovernorates } from "@/src/features/doctors/hooks/use-filters";

export type LocationFilter = {
  governorateId: string | undefined;
  cityId: string | undefined;
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filters: LocationFilter;
  onApply: (filters: LocationFilter) => void;
  /** BusinessType: 1=Doctor, 2=Pharmacy, 3=Laboratory, 4=Radiology */
  businessType: number;
};

function SelectTrigger({ placeholder }: { placeholder: string }) {
  return (
    <Select.Trigger className="flex-row-reverse border border-border rounded-xl px-3 py-2.5">
      <Select.Value placeholder={placeholder} className="text-right flex-1" />
      <Select.TriggerIndicator />
    </Select.Trigger>
  );
}

export function LocationFilterSheet({
  isOpen,
  onOpenChange,
  filters,
  onApply,
  businessType,
}: Props) {
  const [governorateId, setGovernorateId] = useState(filters.governorateId);
  const [cityId, setCityId] = useState(filters.cityId);

  const { data: governorates } = useGovernorates(businessType);
  const { data: cities } = useCities(governorateId, businessType);

  const selectedGovernorate = governorates?.find((g) => g.id === governorateId);
  const selectedCity = cities?.find((c) => c.id === cityId);

  const handleApply = useCallback(() => {
    onApply({ governorateId, cityId });
    onOpenChange(false);
  }, [governorateId, cityId, onApply, onOpenChange]);

  const handleReset = useCallback(() => {
    setGovernorateId(undefined);
    setCityId(undefined);
  }, []);

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content>
          <View className="px-4 py-2 gap-6">
            {/* Header */}
            <View className="flex-row-reverse items-center justify-between">
              <BottomSheet.Close />
              <BottomSheet.Title>تصفية</BottomSheet.Title>
              <Button variant="ghost" size="sm" onPress={handleReset}>
                إعادة تعيين
              </Button>
            </View>

            {/* Governorate */}
            <Select
              presentation="bottom-sheet"
              value={selectedGovernorate ? { value: selectedGovernorate.id, label: selectedGovernorate.name } : undefined}
              onValueChange={(opt) => { setGovernorateId(opt?.value); setCityId(undefined); }}
            >
              <SelectTrigger placeholder="المحافظة" />
              <Select.Portal>
                <Select.Overlay />
                <ScrollableSelectContent>
                  {governorates?.map((g) => (
                    <Select.Item key={g.id} value={g.id} label={g.name}>
                      <Select.ItemIndicator />
                      <Select.ItemLabel className="text-right" />
                    </Select.Item>
                  ))}
                </ScrollableSelectContent>
              </Select.Portal>
            </Select>

            {/* City */}
            <Select
              presentation="bottom-sheet"
              value={selectedCity ? { value: selectedCity.id, label: selectedCity.name } : undefined}
              onValueChange={(opt) => setCityId(opt?.value)}
              isDisabled={!governorateId}
            >
              <SelectTrigger placeholder="المدينة" />
              <Select.Portal>
                <Select.Overlay />
                <ScrollableSelectContent>
                  {cities?.map((c) => (
                    <Select.Item key={c.id} value={c.id} label={c.name}>
                      <Select.ItemIndicator />
                      <Select.ItemLabel className="text-right" />
                    </Select.Item>
                  ))}
                </ScrollableSelectContent>
              </Select.Portal>
            </Select>

            <Button onPress={handleApply}>تطبيق</Button>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
