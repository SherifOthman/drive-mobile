import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Select } from "heroui-native";

/**
 * Use this instead of <Select.Content presentation="bottom-sheet"> whenever
 * the list has many items that need to scroll.
 *
 * Why three extra props are required:
 * - enableDynamicSizing={false}  → locks sheet to snapPoints height so content
 *                                  can overflow and scroll (default auto-sizes
 *                                  to fit all items = no scroll)
 * - enableOverDrag={false}       → prevents dragging past the snap point
 * - contentContainerClassName    → gives BottomSheetScrollView a bounded parent
 *
 * BottomSheetScrollView (from @gorhom/bottom-sheet) is required instead of a
 * plain ScrollView because the sheet intercepts scroll gestures — only its own
 * scroll components cooperate correctly with the pan gesture handler.
 *
 * Usage:
 *   <Select presentation="bottom-sheet" ...>
 *     <Select.Trigger className="flex-row-reverse border border-border rounded-xl">
 *       <Select.Value placeholder="..." className="text-right flex-1" />
 *       <Select.TriggerIndicator />
 *     </Select.Trigger>
 *     <Select.Portal>
 *       <Select.Overlay />
 *       <ScrollableSelectContent>
 *         {items.map(item => <Select.Item ... />)}
 *       </ScrollableSelectContent>
 *     </Select.Portal>
 *   </Select>
 *
 * Note on trigger border:
 *   The HeroUI theme sets field-border: transparent in both light and dark mode.
 *   Light mode compensates with a box shadow; dark mode has nothing.
 *   Always add `border border-border` to Select.Trigger for consistent appearance.
 */
export function ScrollableSelectContent({
  children,
  snapPoint = "60%",
}: {
  children: React.ReactNode;
  snapPoint?: string;
}) {
  return (
    <Select.Content
      presentation="bottom-sheet"
      snapPoints={[snapPoint]}
      enableOverDrag={false}
      enableDynamicSizing={false}
      contentContainerClassName="h-full"
    >
      <BottomSheetScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {children}
      </BottomSheetScrollView>
    </Select.Content>
  );
}
