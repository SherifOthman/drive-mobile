import { useMe } from "@/src/features/profile/profile-queries";
import { Spinner } from "heroui-native";
import { Image, Text, View } from "react-native";

export default function Home() {
  const { data, isLoading } = useMe();

  if (isLoading)
    return (
      <View>
        <Spinner />;
      </View>
    );

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">Welcome</Text>

      <Text>{data?.fullName}</Text>

      {data?.ImageUrl && (
        <Image
          source={{ uri: data.ImageUrl }}
          className="w-20 h-20 rounded-full mt-4"
        />
      )}
    </View>
  );
}
