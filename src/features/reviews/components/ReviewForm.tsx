import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Label,
  Spinner,
  Surface,
  TextArea,
  TextField,
  Typography,
  useThemeColor,
} from "heroui-native";
import { useState } from "react";
import { StarRating } from "./StarRating";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, text: string) => Promise<void>;
};

export function ReviewForm({ visible, onClose, onSubmit }: Props) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mutedColor] = useThemeColor(["muted"]);

  const reset = () => {
    setRating(0);
    setText("");
    setError(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("يرجى اختيار تقييم");
      return;
    }
    if (!text.trim()) {
      setError("يرجى كتابة تعليق");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(rating, text.trim());
      reset();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "حدث خطأ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        className="flex-1 bg-black/55 items-center justify-center p-6"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable className="absolute inset-0" onPress={handleClose} />

        <Surface className="w-full rounded-2xl p-5 shadow-lg shadow-black/25">
          <View className="flex-row-reverse items-center justify-between mb-4">
            <Button variant="ghost" size="sm" isIconOnly onPress={handleClose}>
              <Ionicons name="close" size={22} color={mutedColor} />
            </Button>
            <Typography.Heading type="h5" weight="bold">
              أضف تقييمك
            </Typography.Heading>
            <View className="w-6" />
          </View>

          <View className="items-center mb-5">
            <StarRating rating={rating} size={36} onChange={setRating} />
          </View>

          <TextField className="mb-4">
            <Label className="text-right mb-1">تعليقك</Label>
            <TextArea
              placeholder="اكتب تعليقك هنا..."
              value={text}
              onChangeText={setText}
              variant="secondary"
              className="min-h-25 text-right"
            />
          </TextField>

          {error && (
            <Typography.Paragraph
              type="body-xs"
              className="text-danger text-center mb-3"
            >
              {error}
            </Typography.Paragraph>
          )}

          <View className="flex-row-reverse gap-3">
            <Button variant="ghost" className="flex-1" onPress={handleClose}>
              <Button.Label>إلغاء</Button.Label>
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              isDisabled={submitting}
              onPress={handleSubmit}
            >
              {submitting ? <Spinner /> : <Button.Label>إرسال</Button.Label>}
            </Button>
          </View>
        </Surface>
      </KeyboardAvoidingView>
    </Modal>
  );
}
