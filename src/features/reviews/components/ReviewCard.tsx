import { Avatar, Typography } from "heroui-native";
import { View } from "react-native";
import { nameInitial } from "@/src/arabic";
import { StarRating } from "./StarRating";
import type { TestimonialItem } from "@/src/types";

type Props = {
  review: TestimonialItem;
};

export function ReviewCard({ review }: Props) {
  return (
    <View className="flex-row-reverse gap-3 px-4 py-3">
      <Avatar size="sm">
        {review.userImageUrl ? (
          <Avatar.Image source={{ uri: review.userImageUrl }} />
        ) : (
          <Avatar.Fallback>{nameInitial(review.userName)}</Avatar.Fallback>
        )}
      </Avatar>
      <View className="flex-1 gap-1">
        <View className="flex-row-reverse items-center justify-between">
          <Typography.Paragraph type="body-sm" weight="semibold">
            {review.userName ?? "مجهول"}
          </Typography.Paragraph>
          <StarRating rating={review.rating} />
        </View>
        <Typography.Paragraph type="body-xs" color="muted" className="text-right">
          {review.text}
        </Typography.Paragraph>
      </View>
    </View>
  );
}
