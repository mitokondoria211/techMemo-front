export interface BookmarkResponse {
  id: number;
  title: string;
  url: string;
  memo: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkRequest {
  title: string;
  url: string;
  memo: string;
}
