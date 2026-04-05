import { useEffect, useState } from "react";
import type { BookmarkRequest, BookmarkResponse } from "../../types/bookmark";
import { bookmarkApi } from "./bookmarkApi";

export const useBookmark = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const response = await bookmarkApi.getAll();
      const data = response.data;
      setBookmarks(data);
    } catch (e) {
      setError("取得に失敗しました");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarksCount = async () => {
    const response = await bookmarkApi.getAllCount();
    return response.data;
  };

  const createBookmark = async (request: BookmarkRequest) => {
    try {
      await bookmarkApi.create(request);
    } catch (e) {
      setError("作成に失敗しました");
      throw e;
    }
  };

  const updateBookmark = async (id: number, request: BookmarkRequest) => {
    try {
      await bookmarkApi.update(id, request);
    } catch (e) {
      setError("更新に失敗しました");
      throw e;
    }
  };
  const deleteBookmark = async (id: number) => {
    try {
      await bookmarkApi.delete(id);
    } catch {
      setError("削除に失敗しました");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return {
    bookmarks,
    error,
    loading,
    fetchBookmarks,
    fetchBookmarksCount,
    createBookmark,
    updateBookmark,
    deleteBookmark,
  };
};
