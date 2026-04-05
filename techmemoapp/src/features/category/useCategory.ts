import { useEffect, useState } from "react";
import type { CategoryResponse } from "../../types/category";
import { categoryApi } from "./categoryApi";

export const useCategory = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //記事一覧を取得
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.getAll();
      const data = response.data;
      setCategories(data);
    } catch (e) {
      setError("取得に失敗しました");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (id: number) =>
    categories.find((c) => c.id === id)?.name ?? "不明";

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    getCategoryName,
    loading,
    error,
  };
};
