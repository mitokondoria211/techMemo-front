import { privateApi } from "../../services/axios";

export const likeApi = {
  likeArticle: (articleId: number) =>
    privateApi.post(`articles/${articleId}/likes`),
  unlikeArticle: (articleId: number) =>
    privateApi.delete(`articles/${articleId}/likes`),
};
