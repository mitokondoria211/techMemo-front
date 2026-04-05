import type { User, UserResponse } from "./auth";
import type { CategoryResponse } from "./category";
import type { TagResponse } from "./tag";
import type { UrlRequest, UrlResponse } from "./url";

export interface ArticleData {
  id: number;
  title: string;
  content: string;
  publicFlag: boolean;
  user: User;
  category: string;
  tags: string[] | null;
  url: string[] | null;
  likeCount: number;
  likedByme: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleResponse {
  id: number;
  title: string;
  content: string;
  category: CategoryResponse;
  user: UserResponse;
  tags: TagResponse[];
  likeCount: number;
  likedByme: boolean;
  // urls: Url[];
  publicFlag: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleDetailResponse {
  id: number;
  title: string;
  content: string;
  category: {
    name: string;
    id: number;
  };
  user: UserResponse;
  tags: TagResponse[];
  urls: UrlResponse[];
  publicFlag: boolean;
  likeCount: number;
  likedByme: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleRequest {
  title: string;
  content: string;
  categoryId: number;
  tagNames: string[];
  urls: UrlRequest[];
}

export interface PageResponse<T> {
  content: T[]; // 記事一覧
  totalElements: number; // 総件数
  totalPages: number; // 総ページ数
  currentPage: number; // 現在のページ
  size: number; // 1ページあたりの件数
  first: boolean; // 最初のページか
  last: boolean; // 最後のページか
}
