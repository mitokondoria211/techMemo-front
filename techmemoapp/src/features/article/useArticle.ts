// import { useEffect, useState } from "react";

// import { articleApi } from "./articleApi";
// import type {
//   ArticleDetailResponse,
//   ArticleResponse,
//   PageResponse,
// } from "../../types/article";
// import { useSearchParams } from "react-router-dom";

// export interface ArticleParams {
//   page?: number; // ページ番号（0始まり ※Spring Bootのデフォルト）
//   size?: number; // 1ページあたりの件数
//   sort?: string; // ソート条件 例: 'createdAt,desc'
// }

// export const useArticle = () => {
//   const [articles, setArticles] = useState<ArticleResponse[]>([]);
//   const [article, setArticle] = useState<ArticleDetailResponse | null>(null);

//   const [totalPages, setTotalPages] = useState(1);
//   const [totalElements, setTotalElements] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // ✅ 検索条件をURLで管理
//   const [searchParams, setSearchParams] = useSearchParams();

//   // URLからstateを読み取る
//   const page = Number(searchParams.get("page") ?? "1");
//   const categoryId =
//     searchParams.get("categoryId") ?
//       Number(searchParams.get("categoryId"))
//     : null;
//   const keyword = searchParams.get("keyword") ?? "";
//   const tagId =
//     searchParams.get("tagId") ? Number(searchParams.get("tagId")) : null;

//   //記事一覧を取得
//   const fetchArticles = async () => {
//     setLoading(true);
//     try {
//       const response = await articleApi.search({
//         page: page - 1, // ✅ URLから読む
//         size: 10,
//         categoryId: categoryId ?? undefined, // ✅ URLから読む
//         keyword: keyword || undefined, // ✅ URLから読む
//         tagId: tagId ?? undefined, // ✅ URLから読む
//       });
//       const data: PageResponse<ArticleResponse> = response.data;
//       setArticles(data.content);
//       setTotalPages(data.totalPages);
//       setTotalElements(data.totalElements);
//     } catch (e) {
//       setError("取得に失敗しました");
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getMyArticles = async () => {
//     setLoading(true);
//     try {
//       const response = await articleApi.getMy();
//       setArticles(response.data);
//     } catch (e) {
//       setError("取得に失敗しました");
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getArticleById = async (id: number) => {
//     setLoading(true);
//     try {
//       const response = await articleApi.getById(id);
//       const data = response.data;
//       setArticle(data);
//     } catch (e) {
//       setError("取得に失敗しました");
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (newKeyword: string) => {
//     setSearchParams((prev) => {
//       if (newKeyword) prev.set("keyword", newKeyword);
//       else prev.delete("keyword");
//       prev.set("page", "1");
//       return prev;
//     });
//   };

//   const handleTagClick = (id: number) => {
//     setSearchParams({ tagId: String(id), page: "1" });
//   };

//   const clearTagId = () => {
//     setSearchParams((prev) => {
//       prev.delete("tagId");
//       prev.set("page", "1");
//       return prev;
//     });
//   };

//   const setCategoryId = (id: number | null) => {
//     setSearchParams((prev) => {
//       if (id) prev.set("categoryId", String(id));
//       else prev.delete("categoryId");
//       prev.set("page", "1");
//       return prev;
//     });
//   };

//   const changePage = (newPage: number) => {
//     setSearchParams((prev) => {
//       prev.set("page", String(newPage));
//       return prev;
//     });
//   };
//   // // カテゴリ変更（ページを1に戻す）
//   // const changeCategory = (newCategoryId: number | null) => {
//   //   setCategoryId(newCategoryId);
//   //   fetchArticles(1, newCategoryId, keyword);
//   // };

//   // // キーワード変更（ページを1に戻す）
//   // const changeKeyword = (newKeyword: string) => {
//   //   setKeyword(newKeyword);
//   //   fetchArticles(1, categoryId, newKeyword);
//   // };

//   //記事作成
//   const createArticle = async (data: ArticleRequest) => {
//     try {
//       await articleApi.create(data);
//       await fetchArticles();
//     } catch {
//       setError("作成に失敗しました");
//     }
//   };

//   // 記事更新
//   const updataArticle = async (id: number, data: ArticleRequest) => {
//     try {
//       await articleApi.update(id, data);
//       await fetchArticles();
//     } catch {
//       setError("更新に失敗しました");
//     }
//   };

//   //記事削除
//   const deleteArticle = async (id: number) => {
//     try {
//       await articleApi.delete(id);
//       setArticles((prev) => prev.filter((article) => article.id !== id)); //再取得せず差分を更新
//     } catch {
//       setError("削除に失敗しました");
//     }
//   };

//   useEffect(() => {
//     fetchArticles();
//   }, [searchParams]);

//   return {
//     articles,
//     article,
//     loading,
//     error,
//     getMyArticles,
//     getArticleById,
//     createArticle,
//     updataArticle,
//     deleteArticle,
//     page,
//     totalPages,
//     totalElements,
//     changePage,
//     categoryId,
//     keyword,
//     setCategoryId,
//     handleSearch,
//     handleTagClick,
//     clearTagId,
//     tagId,
//   };
// };
