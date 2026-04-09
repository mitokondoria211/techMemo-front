import { useEffect, useState } from "react";

import { articleApi } from "./articleApi";
import type {
  ArticleDetailResponse,
  ArticleRequest,
} from "../../types/article";

export const useArticleDetail = (id?: number) => {
  const [article, setArticle] = useState<ArticleDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await articleApi.getById(id);
        setArticle(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  //記事作成
  const createArticle = async (data: ArticleRequest) => {
    try {
      setLoading(true);
      await articleApi.create(data);
    } catch {
      setError("作成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  // 記事更新
  const updateArticle = async (id: number, data: ArticleRequest) => {
    try {
      setLoading(true);
      await articleApi.update(id, data);
    } catch {
      setError("更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const updateVisibility = async (id: number, publicFlag: boolean) => {
    try {
      setLoading(true);
      await articleApi.updateVisibility(id, publicFlag);
    } catch {
      setError("更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  //記事削除
  const deleteArticle = async (id: number) => {
    try {
      await articleApi.delete(id);
    } catch {
      setError("削除に失敗しました");
    }
  };

  return {
    article,
    loading,
    error,
    createArticle,
    updataArticle: updateArticle,
    updateVisibility,
    deleteArticle,
  };
};
