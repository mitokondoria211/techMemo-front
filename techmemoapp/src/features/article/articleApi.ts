import { publicApi, privateApi } from "@/services/axios";
import type { PageResponse, ArticleSearchParams } from "./types";
import type {
  ArticleDetailResponse,
  ArticleRequest,
  ArticleResponse,
} from "../../types/article";

export interface ArticleParams {
  page?: number; // ページ番号（0始まり ※Spring Bootのデフォルト）
  size?: number; // 1ページあたりの件数
  sort?: string; // ソート条件 例: 'createdAt,desc'
}

export const articleApi = {
  //一覧取得
  getAll: (params: ArticleParams) =>
    publicApi.get<PageResponse<ArticleResponse>>("/articles", {
      params: {
        page: params.page ?? 0,
        size: params.size ?? 10,
        sort: params.sort ?? "createdAt,desc",
      },
    }),

  getMy: (params: ArticleSearchParams) =>
    privateApi.get<PageResponse<ArticleResponse>>("/articles/me", {
      params: {
        keyword: params.keyword,
        categoryId: params.categoryId,
        tagId: params.tagId,
        page: params.page ?? 0,
        size: params.size ?? 10,
        sort: params.sort ?? "createdAt,desc",
      },
    }),
  getMyRecent: () => privateApi.get<ArticleResponse[]>("/articles/me/recent"),

  getMyCount: () => privateApi.get<number>("/articles/me/count"),
  getMyCountAndPrivate: () =>
    privateApi.get<number>("/articles/me/count/private"),
  getById: (id: number) =>
    publicApi.get<ArticleDetailResponse>(`/articles/${id}`),

  search: (params: ArticleSearchParams) =>
    privateApi.get<PageResponse<ArticleResponse>>("/articles/search", {
      params: {
        keyword: params.keyword,
        categoryId: params.categoryId,
        tagId: params.tagId,
        page: params.page ?? 0,
        size: params.size ?? 10,
        sort: params.sort ?? "createdAt,desc",
      },
    }),

  create: (data: ArticleRequest) =>
    privateApi.post<ArticleResponse>("/articles", data),

  update: (id: number, data: ArticleRequest) =>
    privateApi.put<ArticleResponse>(`/articles/${id}`, data),

  updateVisibility: (id: number, publicFlag: boolean) =>
    privateApi.patch<ArticleResponse>(`/articles/${id}/visibility`, {
      publicFlag: publicFlag,
    }),

  delete: (id: number) => privateApi.delete(`/articles/${id}`),
};
