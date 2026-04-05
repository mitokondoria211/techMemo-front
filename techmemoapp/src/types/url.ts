export interface UrlResponse {
  id: number;
  url: string;
  title: string;
  memo: string;
  articleId: number;
  articleTitle: string;
  createdAt: string;
  updatedAt: string;
}

export interface UrlRequest {
  title: string;
  url: string;
}

// export interface UrlRequest {
//   url: string;
//   title: string;
//   memo: string;
//   sortOrder: number;
// }
