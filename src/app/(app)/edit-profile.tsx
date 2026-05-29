import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { PageHeader } from "@/src/components/PageHeader";
import { AvatarPicker } from "@/src/features/profile/components/avatar-picker";
import { useMe, useUpdateMe } from "@/src/features/profile/hooks/use-profile";
import {
  editProfileSchema,
  type EditProfileForm,
} from "@/src/features/profile/schemas/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import {
  Button,
  FieldError,
  Input,
  Label,
  Skeleton,
  TextField,
} from "heroui-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditProfile() {
  const insets = useSafeAreaInsets();
  const { data, isLoading } = useMe();
  const updateMe = useUpdateMe();
  const [localImage, setLocalImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    values: { fullName: data?.fullName ?? "" },
  });

  const onSubmit = async (values: EditProfileForm) => {
    await updateMe.mutateAsync({
      fullName: values.fullName,
      imageUri: localImage ?? undefined,
    });
    router.back();
  };

  const hasChanges = isDirty || localImage !== null;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <PageHeader title="تعديل الملف الشخصي " />

      <ScreenWrapper isLoading={isLoading} loadingView={
        <View className="items-center">
          <Skeleton className="w-24 h-24 rounded-full" />
          <Skeleton className="w-48 h-6 rounded-lg mt-4" />
        </View>
      } className="gap-6">
        <AvatarPicker
          avatarUri={localImage ?? data?.imageUrl ?? undefined}
          fallbackName={data?.fullName}
          onChangeImage={setLocalImage}
        />
        <AvatarPicker
          avatarUri={localImage ?? data?.imageUrl ?? undefined}
          fallbackName={data?.fullName}
          onChangeImage={setLocalImage}
        />

        <View className="gap-5">
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.fullName}>
                <Label className="flex items-end">الاسم الكامل</Label>
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="أدخل اسمك الكامل"
                  textAlign="right"
                />
                {errors.fullName && (
                  <FieldError>{errors.fullName.message}</FieldError>
                )}
              </TextField>
            )}
          />

          <TextField isDisabled>
            <Label className="flex items-end">البريد الإلكتروني</Label>
            <Input value={data?.email ?? ""} textAlign="right" />
          </TextField>
        </View>

        {hasChanges && (
          <Button
            size="lg"
            variant="primary"
            isDisabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            className="w-full mt-4"
          >
            <Button.Label>حفظ</Button.Label>
          </Button>
        )}
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}
