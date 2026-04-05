import { publicApi } from "../../services/axios";
import type { CategoryResponse } from "../../types/category";

export const categoryApi = {
  //一覧取得
  getAll: () => publicApi.get<CategoryResponse[]>("/categories"),
  getById: (id: number) => publicApi.get<CategoryResponse>(`/categories/${id}`),
};
