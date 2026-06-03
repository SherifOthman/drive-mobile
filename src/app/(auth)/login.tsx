import { GoogleIcon } from "@/src/features/auth/components/GoogleIcon";
import { useGoogleLogin } from "@/src/features/auth/hooks/use-google-login";
import { Alert, Button, Spinner, Surface, Typography, useThemeColor } from "heroui-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const FEATURES = [
  { icon: "people-outline" as const,   text: "أطباء، صيدليات، معامل وأشعة" },
  { icon: "calendar-outline" as const, text: "مواعيد العمل وأوقات الزيارة" },
  { icon: "star-outline" as const,     text: "تقييمات وتعليقات المرضى"      },
];

export default function Login() {
  const insets = useSafeAreaInsets();
  const { signIn, isLoading, error } = useGoogleLogin();
  const [accent, accentForeground] = useThemeColor(["accent", "accent-foreground"]);

  return (
    <Surface
      variant="default"
      className="bg-background flex-1"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* ── Hero ────────────────────────────────── */}
      <Surface variant="transparent" className="flex-1 items-center justify-center px-8 gap-8">

        {/* Logo */}
        <Surface variant="transparent" className="items-center gap-3">
          <Surface
            variant="transparent"
            className="w-24 h-24 rounded-3xl bg-accent items-center justify-center"
            style={{
              shadowColor: accent,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.4,
              shadowRadius: 20,
              elevation: 14,
            }}
          >
            <Typography.Heading type="h1" style={{ fontSize: 48 }}>🩺</Typography.Heading>
          </Surface>
          <Surface variant="transparent" className="items-center gap-0.5">
            <Typography.Heading type="h1" weight="bold" align="center">نبض</Typography.Heading>
            <Typography.Paragraph type="body-sm" color="muted" align="center">دليلك الصحي الشامل</Typography.Paragraph>
          </Surface>
        </Surface>

        {/* Feature list */}
        <Surface variant="secondary" className="w-full rounded-3xl p-1 gap-1">
          {FEATURES.map((item, i) => (
            <Surface key={i} variant="transparent" className="flex-row-reverse items-center gap-3 px-4 py-3 rounded-2xl">
              <Surface variant="transparent" className="w-9 h-9 rounded-xl bg-accent/10 items-center justify-center">
                <Ionicons name={item.icon} size={19} color={accent} />
              </Surface>
              <Typography.Paragraph type="body-sm" weight="medium" className="flex-1 text-right">
                {item.text}
              </Typography.Paragraph>
            </Surface>
          ))}
        </Surface>

      </Surface>

      {/* ── CTA ─────────────────────────────────── */}
      <Surface variant="transparent" className="px-6 pb-6 gap-4">
        {error ? (
          <Alert status="danger" className="rounded-2xl">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description className="text-right">{error}</Alert.Description>
            </Alert.Content>
          </Alert>
        ) : null}

        <Button
          variant="primary"
          size="lg"
          isDisabled={isLoading}
          onPress={signIn}
          className="w-full"
          feedbackVariant="scale-ripple"
        >
          {isLoading ? (
            <Spinner color={accentForeground} />
          ) : (
            <>
              <GoogleIcon size={22} />
              <Button.Label className="font-bold">تسجيل الدخول بجوجل</Button.Label>
            </>
          )}
        </Button>

        <Typography.Paragraph type="body-xs" color="muted" align="center">
          بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية
        </Typography.Paragraph>
      </Surface>
    </Surface>
  );
}
