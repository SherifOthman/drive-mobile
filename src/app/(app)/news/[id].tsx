import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Linking, ScrollView, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Chip, Separator, Typography, useThemeColor } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { PageHeader } from "@/src/components/PageHeader";
import { getNewsById } from "@/src/features/news/news-api";
import { formatNewsDate } from "@/src/features/news/format-date";

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [mutedColor] = useThemeColor(["muted"]);
  const [imageFailed, setImageFailed] = useState(false);

  const { data: article, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: () => getNewsById(id),
    enabled: !!id,
    staleTime: 60_000,
  });

  return (
    <View className="flex-1 bg-background">
      <PageHeader title="الخبر" />

      {!isLoading && article && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        >
          {/* Cover — full width, no horizontal padding */}
          {article.imageUrl && !imageFailed ? (
            <Image
              source={{ uri: article.imageUrl }}
              style={styles.cover}
              contentFit="cover"
              transition={200}
              onError={() => setImageFailed(true)}
              placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
            />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Ionicons name="newspaper-outline" size={48} color={mutedColor} />
            </View>
          )}

          {/* Content — padded */}
          <View className="px-5 pt-5 gap-4">
            {/* Category */}
            <View className="flex-row-reverse">
              <Chip size="sm" variant="soft" color="accent">
                <Chip.Label>{article.category}</Chip.Label>
              </Chip>
            </View>

            {/* Title */}
            <Typography.Heading
              type="h4"
              weight="bold"
              className="text-right leading-8"
            >
              {article.title}
            </Typography.Heading>

            {/* Meta row */}
            <View className="flex-row-reverse items-center justify-between">
              <View className="flex-row-reverse items-center gap-1.5">
                <Ionicons name="time-outline" size={14} color={mutedColor} />
                <Typography.Paragraph type="body-xs" color="muted">
                  {formatNewsDate(article.publishedAt)}
                </Typography.Paragraph>
              </View>
              {article.author ? (
                <View className="flex-row-reverse items-center gap-1.5">
                  <Ionicons name="person-outline" size={14} color={mutedColor} />
                  <Typography.Paragraph
                    type="body-xs"
                    color="muted"
                    numberOfLines={1}
                    className="max-w-40"
                  >
                    {article.author}
                  </Typography.Paragraph>
                </View>
              ) : null}
            </View>

            <Separator />

            {/* Summary */}
            {article.summary ? (
              <Typography.Paragraph
                type="body-sm"
                className="text-right"
                style={{ lineHeight: 28 }}
              >
                {article.summary}
              </Typography.Paragraph>
            ) : null}

            {/* Read full article */}
            {article.sourceUrl ? (
              <Button
                variant="secondary"
                className="w-full mt-2"
                onPress={() => Linking.openURL(article.sourceUrl!)}
              >
                <Ionicons name="open-outline" size={16} color={mutedColor} />
                <Button.Label>قراءة الخبر كاملاً</Button.Label>
              </Button>
            ) : null}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    width: "100%",
    height: 230,
  },
  coverPlaceholder: {
    width: "100%",
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
});
