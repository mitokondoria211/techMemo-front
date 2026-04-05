import { privateApi } from "../../services/axios";
import type { BookmarkRequest, BookmarkResponse } from "../../types/bookmark";

export const bookmarkApi = {
  //一覧取得
  getAll: () => privateApi.get<BookmarkResponse[]>("/bookmarks"),
  getAllCount: () => privateApi.get<number>("/bookmarks/count"),
  getById: (id: number) => privateApi.get<BookmarkResponse>(`/bookmarks/${id}`),
  create: (request: BookmarkRequest) =>
    privateApi.post<BookmarkResponse>(`/bookmarks`, request),
  update: (id: number, request: BookmarkRequest) =>
    privateApi.put(`/bookmarks/${id}`, request),
  delete: (id: number) => privateApi.delete(`/bookmarks/${id}`),
};
