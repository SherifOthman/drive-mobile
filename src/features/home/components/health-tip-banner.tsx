import { Alert } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";

const TIPS = [
  "اشرب 8 أكواب من الماء يومياً للحفاظ على صحتك.",
  "النوم المنتظم 7–8 ساعات يعزز جهازك المناعي.",
  "المشي 30 دقيقة يومياً يقلل خطر أمراض القلب.",
  "تناول الفواكه والخضروات الملونة لتنوع الفيتامينات.",
  "الفحص الدوري المبكر يحمي من الأمراض المزمنة.",
];

function getDailyTip(): string {
  return TIPS[new Date().getDate() % TIPS.length];
}

export function HealthTipBanner() {
  return (
    <Alert status="accent" className="rounded-2xl">
      <Alert.Indicator>
        <Ionicons name="bulb-outline" size={20} color="#6366f1" />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title className="text-right">نصيحة صحية اليوم</Alert.Title>
        <Alert.Description className="text-right leading-5">
          {getDailyTip()}
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}
