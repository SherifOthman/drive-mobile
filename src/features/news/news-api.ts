import { api } from "@/src/api";

export type NewsArticle = {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  category: string;
  publishedAt: string;
  author: string | null;
  isFeatured: boolean;
  sourceUrl: string | null;
};

export type NewsQuery = {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
};

export type PaginatedNews = {
  items: NewsArticle[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
};

export const getNews = async (query: NewsQuery = {}): Promise<PaginatedNews> => {
  const res = await api.get<PaginatedNews>("/news", { params: query });
  return res.data;
};

export const getNewsCategories = async (): Promise<string[]> => {
  const res = await api.get<string[]>("/news/categories");
  return res.data;
};

export const getNewsById = async (id: string): Promise<NewsArticle> => {
  const res = await api.get<NewsArticle>(`/news/${id}`);
  return res.data;
};
