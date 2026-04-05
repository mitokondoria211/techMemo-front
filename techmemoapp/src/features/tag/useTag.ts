import { useEffect, useState } from "react";
import type { TagResponse } from "../../types/tag";
import { tagApi } from "./tagApi";

export const useTag = () => {
  const [tags, setTags] = useState<TagResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //記事一覧を取得
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await tagApi.getAll();
      const data = response.data;
      setTags(data);
    } catch (e) {
      setError("取得に失敗しました");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getTagName = (id: number) =>
    tags.find((c) => c.id === id)?.name ?? "不明";

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    tags,
    getTagName,
    loading,
    error,
  };
};
