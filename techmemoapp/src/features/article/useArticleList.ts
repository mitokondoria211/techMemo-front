import { useEffect, useState } from "react";

import { articleApi } from "./articleApi";
import type { ArticleResponse, PageResponse } from "../../types/article";
import { useSearchParams } from "react-router-dom";

export const useArticleList = ({ myOnly = true } = {}) => {
  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const PAGE_SIZE = 10;

  // ✅ 検索条件をURLで管理
  const [searchParams, setSearchParams] = useSearchParams();

  // URLからstateを読み取る
  const page = Number(searchParams.get("page") ?? "1");
  const categoryId =
    searchParams.get("categoryId") ?
      Number(searchParams.get("categoryId"))
    : null;
  const keyword = searchParams.get("keyword") ?? "";
  const tagId =
    searchParams.get("tagId") ? Number(searchParams.get("tagId")) : null;

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response =
        myOnly ?
          await articleApi.getMy({
            page: page - 1, // ✅ URLから読む
            size: PAGE_SIZE,
            categoryId: categoryId ?? undefined, // ✅ URLから読む
            keyword: keyword || undefined, // ✅ URLから読む
            tagId: tagId ?? undefined, // ✅ URLから読む
          })
        : await articleApi.search({
            page: page - 1, // ✅ URLから読む
            size: PAGE_SIZE,
            categoryId: categoryId ?? undefined, // ✅ URLから読む
            keyword: keyword || undefined, // ✅ URLから読む
            tagId: tagId ?? undefined, // ✅ URLから読む
          });

      const data: PageResponse<ArticleResponse> = response.data;
      setArticles(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (e) {
      setError("取得に失敗しました");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRecentArticles = async () => {
    const res = await articleApi.getMyRecent();
    return res.data;
  };

  const fetchMyArticlesCount = async () => {
    const res = await articleApi.getMyCount();

    return res.data;
  };

  const fetchMyArticlesCountAndPrivate = async () => {
    const res = await articleApi.getMyCountAndPrivate();

    return res.data;
  };

  const handleSearch = (newKeyword: string) => {
    setSearchParams((prev) => {
      if (newKeyword) prev.set("keyword", newKeyword);
      else prev.delete("keyword");
      prev.set("page", "1");
      return prev;
    });
  };

  const handleTagClick = (id: number) => {
    setSearchParams((prev) => {
      prev.set("tagId", String(id));
      prev.set("page", "1");
      return prev;
    });
  };

  const clearTagId = () => {
    setSearchParams((prev) => {
      prev.delete("tagId");
      prev.set("page", "1");
      return prev;
    });
  };

  const resetSearchConditions = () => {
    setSearchParams((prev) => {
      prev.delete("tagId");
      prev.delete("categoryId");
      prev.delete("keyword");
      prev.set("page", "1");
      return prev;
    });
  };

  const setCategoryId = (id: number | null) => {
    setSearchParams((prev) => {
      if (id) prev.set("categoryId", String(id));
      else prev.delete("categoryId");
      prev.set("page", "1");
      return prev;
    });
  };

  const changePage = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", String(newPage));
      return prev;
    });
  };

  const formatSearchResult = () => {
    const start = 1 + (page - 1) * PAGE_SIZE;
    const end = PAGE_SIZE < totalElements ? PAGE_SIZE * page : totalElements;
    return `検索結果：${start}〜${end}件 / 全${totalElements}件`;
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return {
    articles,
    loading,
    error,
    page,
    totalPages,
    totalElements,
    changePage,
    categoryId,
    keyword,
    formatSearchResult,
    fetchMyArticlesCount,
    fetchMyArticlesCountAndPrivate,
    fetchMyRecentArticles,
    // getMyArticles,
    fetchArticles,
    setCategoryId,
    handleSearch,
    handleTagClick,
    clearTagId,
    resetSearchConditions,
    tagId,
  };
};
