import { GoogleIcon } from "@/src/features/auth/GoogleIcon";
import { useGoogleLogin } from "@/src/features/auth/use-google-login";
import {
  Alert,
  Button,
  Spinner,
  Typography,
  useThemeColor,
} from "heroui-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type Feature = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle: string;
};

const FEATURES: Feature[] = [
  { icon: "medkit-outline",   title: "أطباء وصيدليات ومعامل",    subtitle: "اعثر على مزودي الرعاية الصحية بسهولة" },
  { icon: "calendar-outline", title: "مواعيد وأوقات العمل",       subtitle: "تعرف على أوقات الزيارة في ثوانٍ"      },
  { icon: "star-outline",     title: "تقييمات المرضى",            subtitle: "اقرأ تجارب حقيقية واختر بثقة"         },
];

function FeatureCard({ icon, title, subtitle, accent }: Feature & { accent: string }) {
  return (
    <View className="flex-row-reverse items-center gap-3.5 px-4 py-3.5 bg-surface-secondary rounded-2xl">
      <View className="w-11 h-11 rounded-xl items-center justify-center"
        style={{ backgroundColor: accent + "22" }}>
        <Ionicons name={icon} size={22} color={accent} />
      </View>
      <View className="flex-1 gap-0.5">
        <Typography.Paragraph type="body-sm" weight="semibold" className="text-right">
          {title}
        </Typography.Paragraph>
        <Typography.Paragraph type="body-xs" color="muted" className="text-right">
          {subtitle}
        </Typography.Paragraph>
      </View>
    </View>
  );
}

export default function Login() {
  const insets = useSafeAreaInsets();
  const { signIn, isLoading, error } = useGoogleLogin();

  const [accent, accentForeground, foreground, muted, background] =
    useThemeColor(["accent", "accent-foreground", "foreground", "muted", "background"]);

  return (
    <View
      className="flex-1"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: background }}
    >
      {/* Hero */}
      <View className="flex-1 items-center justify-center px-6 gap-9">

        {/* Logo */}
        <View className="items-center gap-4">
          <View
            className="w-24 h-24 rounded-3xl items-center justify-center"
            style={{
              backgroundColor: accent,
              shadowColor: accent,
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.35,
              shadowRadius: 24,
              elevation: 16,
            }}
          >
            <Typography.Heading type="h1" style={{ fontSize: 44, lineHeight: 54 }}>
              🩺
            </Typography.Heading>
          </View>

          <View className="items-center gap-1">
            <Typography.Heading
              type="h1"
              weight="bold"
              style={{ color: foreground, textAlign: "center" }}
            >
              نبض
            </Typography.Heading>
            <Typography.Paragraph
              type="body-sm"
              style={{ color: muted, textAlign: "center" }}
            >
              دليلك الصحي الشامل
            </Typography.Paragraph>
          </View>
        </View>

        {/* Feature cards */}
        <View className="w-full gap-2">
          {FEATURES.map((item, i) => (
            <FeatureCard key={i} {...item} accent={accent} />
          ))}
        </View>
      </View>

      {/* CTA */}
      <View className="px-6 pb-5 gap-3">
        {error ? (
          <Alert status="danger" className="rounded-2xl">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description style={{ textAlign: "right" }}>{error}</Alert.Description>
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
              <Button.Label style={{ fontWeight: "700" }}>
                تسجيل الدخول بجوجل
              </Button.Label>
            </>
          )}
        </Button>

        <Typography.Paragraph
          type="body-xs"
          style={{ color: muted, textAlign: "center" }}
        >
          بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية
        </Typography.Paragraph>
      </View>
    </View>
  );
}
