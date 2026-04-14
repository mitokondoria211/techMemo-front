// export interface ArticleResponse {
//   id: number;
//   title: string;
//   content: string;
//   category: {
//     name: string;
//   };
//   user: UserResponse;
//   tags: Tag[];
//   urls: Url[];
//   createdAt: string;
//   updatedAt: string;
// }

export interface Tag {
  id: number;
  name: string;
}

export interface Url {
  id: number;
  title: string;
  memo: string;
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

export interface ArticleSearchParams {
  keyword?: string;
  categoryId?: number;
  tagId?: number;
  page: number;
  size: number;
  sort: string;
}
