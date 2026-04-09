import { privateApi } from "../../services/axios";

export const likeApi = {
  likeArticle: (articleId: number) =>
    privateApi.post(`/api/v1/articles/${articleId}/likes`),
  unlikeArticle: (articleId: number) =>
    privateApi.delete(`/api/v1/articles/${articleId}/likes`),
};
