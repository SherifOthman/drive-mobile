import { Ionicons } from "@expo/vector-icons";
import { Card, Chip, PressableFeedback, Surface, Typography, useThemeColor } from "heroui-native";
import { Image, StyleSheet } from "react-native";
import type { NewsArticle } from "../api/news-api";
import { formatNewsDate } from "../utils/format-date";

type Props = {
  article: NewsArticle;
  onPress?: () => void;
  className?: string;
};

export function NewsCard({ article, onPress, className }: Props) {
  const [mutedColor] = useThemeColor(["muted"]);

  return (
    <PressableFeedback onPress={onPress} animation={false}>
      <PressableFeedback.Scale>
        <Card className={className}>
          {article.imageUrl != null && (
            <Image source={{ uri: article.imageUrl }} style={styles.image} resizeMode="cover" />
          )}
          <Card.Body className="gap-2.5 p-4">
            {/* Category + featured badge row */}
            <Surface variant="transparent" className="flex-row-reverse items-center justify-between">
              <Chip size="sm" variant="soft" color="accent">
                <Chip.Label>{article.category}</Chip.Label>
              </Chip>
              {article.isFeatured && (
                <Chip size="sm" variant="soft" color="warning">
                  <Ionicons name="star" size={11} color="#d97706" />
                  <Chip.Label>مميز</Chip.Label>
                </Chip>
              )}
            </Surface>

            <Typography.Heading
              type="h5"
              weight="bold"
              className="text-right leading-6"
              numberOfLines={2}
            >
              {article.title}
            </Typography.Heading>

            <Typography.Paragraph
              type="body-sm"
              color="muted"
              className="text-right"
              numberOfLines={3}
            >
              {article.summary}
            </Typography.Paragraph>

            {/* Footer row */}
            <Surface variant="transparent" className="flex-row-reverse items-center justify-between pt-2 border-t border-border">
              <Surface variant="transparent" className="flex-row-reverse items-center gap-1">
                <Ionicons name="time-outline" size={13} color={mutedColor} />
                <Typography.Paragraph type="body-xs" color="muted">
                  {formatNewsDate(article.publishedAt)}
                </Typography.Paragraph>
              </Surface>
              {article.author != null && (
                <Surface variant="transparent" className="flex-row-reverse items-center gap-1">
                  <Ionicons name="person-outline" size={13} color={mutedColor} />
                  <Typography.Paragraph type="body-xs" color="muted">
                    {article.author}
                  </Typography.Paragraph>
                </Surface>
              )}
            </Surface>
          </Card.Body>
        </Card>
      </PressableFeedback.Scale>
      <PressableFeedback.Ripple />
    </PressableFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 185,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
});
