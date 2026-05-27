import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Avatar, PressableFeedback, Typography } from "heroui-native";
import { Alert, View } from "react-native";

type Props = {
  avatarUri?: string;
  fallbackName?: string;
  onChangeImage: (uri: string) => void;
};

export function AvatarPicker({
  avatarUri,
  fallbackName,
  onChangeImage,
}: Props) {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("الإذن مرفوض", "يرجى السماح بالوصول إلى الصور من الإعدادات");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      onChangeImage(result.assets[0].uri);
    }
  };

  return (
    <View className="items-center gap-3">
      <View>
        <Avatar size="lg" className="h-25 w-25 rounded-full">
          {avatarUri ? <Avatar.Image source={{ uri: avatarUri }} /> : null}
          <Avatar.Fallback delayMs={200}>
            {fallbackName?.charAt(0) ?? "؟"}
          </Avatar.Fallback>
        </Avatar>

        <PressableFeedback
          onPress={pickImage}
          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent items-center justify-center"
          style={{ elevation: 3 }}
        >
          <Ionicons name="camera" size={16} color="white" />
        </PressableFeedback>
      </View>

      <PressableFeedback onPress={pickImage}>
        <Typography type="body-sm" className="text-accent" weight="medium">
          تغيير الصورة
        </Typography>
      </PressableFeedback>
    </View>
  );
}
