import { Card, Skeleton } from "heroui-native";
import { View } from "react-native";

export function NewsCardSkeleton() {
  return (
    <Card>
      <Skeleton className="w-full h-44 rounded-b-none rounded-t-xl" />
      <View className="p-4 gap-3">
        <View className="flex-row-reverse gap-2">
          <Skeleton className="w-20 h-5 rounded-full" />
        </View>
        <Skeleton className="w-full h-5 rounded-md" />
        <Skeleton className="w-3/4 h-5 rounded-md" />
        <Skeleton className="w-full h-4 rounded-md" />
        <Skeleton className="w-5/6 h-4 rounded-md" />
        <View className="flex-row-reverse items-center justify-between pt-2">
          <Skeleton className="w-24 h-3 rounded-md" />
          <Skeleton className="w-20 h-3 rounded-md" />
        </View>
      </View>
    </Card>
  );
}

export function NewsCardSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <View className="gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </View>
  );
}

export function NewsCardHorizontalSkeleton() {
  return (
    <Card className="w-72">
      <Skeleton className="w-full h-36 rounded-b-none rounded-t-xl" />
      <View className="p-3 gap-2">
        <Skeleton className="w-16 h-5 rounded-full self-end" />
        <Skeleton className="w-full h-4 rounded-md" />
        <Skeleton className="w-4/5 h-4 rounded-md" />
        <Skeleton className="w-24 h-3 rounded-md self-end" />
      </View>
    </Card>
  );
}
