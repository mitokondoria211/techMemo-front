import { publicApi } from "../../services/axios";
import type { TagResponse } from "../../types/tag";

export const tagApi = {
  //一覧取得
  getAll: () => publicApi.get<TagResponse[]>("/tags"),
  getById: (id: number) => publicApi.get<TagResponse>(`/tags/${id}`),
};
