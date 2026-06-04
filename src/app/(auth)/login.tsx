import { GoogleIcon } from "@/src/features/auth/components/GoogleIcon";
import { useGoogleLogin } from "@/src/features/auth/hooks/use-google-login";
import {
  Alert,
  Button,
  Spinner,
  Typography,
  useThemeColor,
} from "heroui-native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useUniwind } from "uniwind";

// ─── Types ──────────────────────────────────────────────────────────────────

type Feature = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  {
    icon: "medkit-outline",
    title: "أطباء وصيدليات ومعامل",
    subtitle: "اعثر على مزودي الرعاية الصحية بسهولة",
  },
  {
    icon: "calendar-outline",
    title: "مواعيد وأوقات العمل",
    subtitle: "تعرف على أوقات الزيارة في ثوانٍ",
  },
  {
    icon: "star-outline",
    title: "تقييمات المرضى",
    subtitle: "اقرأ تجارب حقيقية واختر بثقة",
  },
];

// ─── FeatureCard ─────────────────────────────────────────────────────────────

function FeatureCard({
  icon,
  title,
  subtitle,
  accent,
  cardBg,
  textColor,
  mutedColor,
}: Feature & {
  accent: string;
  cardBg: string;
  textColor: string;
  mutedColor: string;
}) {
  return (
    <View style={[styles.featureCard, { backgroundColor: cardBg }]}>
      {/* Icon badge */}
      <View style={[styles.iconBadge, { backgroundColor: accent + "22" }]}>
        <Ionicons name={icon} size={22} color={accent} />
      </View>
      {/* Text */}
      <View style={styles.featureText}>
        <Typography.Paragraph
          type="body-sm"
          weight="semibold"
          style={{ color: textColor, textAlign: "right" }}
        >
          {title}
        </Typography.Paragraph>
        <Typography.Paragraph
          type="body-xs"
          style={{ color: mutedColor, textAlign: "right" }}
        >
          {subtitle}
        </Typography.Paragraph>
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function Login() {
  const insets = useSafeAreaInsets();
  const { signIn, isLoading, error } = useGoogleLogin();
  const { theme } = useUniwind();

  const isDark = theme === "dark";

  // Semantic colors from the HeroUI theme
  const [accent, accentForeground, foreground, muted, background] =
    useThemeColor([
      "accent",
      "accent-foreground",
      "foreground",
      "muted-foreground",
      "background",
    ]);

  // Card background: slightly elevated surface in both modes
  const cardBg = isDark
    ? "rgba(255,255,255,0.06)"
    : "rgba(0,0,0,0.04)";

  // Divider
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: background,
        },
      ]}
    >
      {/* ── HERO ──────────────────────────────────────────── */}
      <View style={styles.hero}>

        {/* Logo mark */}
        <View style={styles.logoSection}>
          <View
            style={[
              styles.logoBadge,
              {
                backgroundColor: accent,
                shadowColor: accent,
              },
            ]}
          >
            <Typography.Heading
              type="h1"
              style={{ fontSize: 44, lineHeight: 54 }}
            >
              🩺
            </Typography.Heading>
          </View>

          <View style={styles.logoText}>
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

        {/* Feature list */}
        <View style={styles.featureList}>
          {FEATURES.map((item, i) => (
            <View key={i}>
              <FeatureCard
                {...item}
                accent={accent}
                cardBg={cardBg}
                textColor={foreground}
                mutedColor={muted}
              />
              {i < FEATURES.length - 1 && (
                <View
                  style={[styles.divider, { backgroundColor: dividerColor }]}
                />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* ── CTA ───────────────────────────────────────────── */}
      <View style={styles.cta}>
        {/* Error banner */}
        {error ? (
          <Alert status="danger" className="rounded-2xl mb-2">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description style={{ textAlign: "right" }}>
                {error}
              </Alert.Description>
            </Alert.Content>
          </Alert>
        ) : null}

        {/* Sign-in button */}
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

        {/* Legal note */}
        <Typography.Paragraph
          type="body-xs"
          style={{ color: muted, textAlign: "center" }}
          className="mt-1"
        >
          بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية
        </Typography.Paragraph>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 36,
  },

  // Logo
  logoSection: {
    alignItems: "center",
    gap: 16,
  },
  logoBadge: {
    width: 100,
    height: 100,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 16,
  },
  logoText: {
    alignItems: "center",
    gap: 4,
  },

  // Feature cards
  featureList: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  featureCard: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    flex: 1,
    gap: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 18,
  },

  // CTA
  cta: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 12,
  },
});
