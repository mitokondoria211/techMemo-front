import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../features/auth/PrivateRoute";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
// import DashBoardPage from "../pages/dashboard/DashBoardPage";
import ArticleListPage from "../pages/article/ArticleListPage";
import ArticleDetailPage from "../pages/article/ArticleDetailPage";
import AriticleEditPage from "../pages/article/ArticleEditPage";
import AriticleUpdatePage from "../pages/article/ArticleUpdatePage";
import DashboardPage from "../pages/dashboard/DashBoardPage";
import NotFoundPage from "../pages/NotFoundPage";
import BookmarkPage from "../pages/bookmark/BookmarkPage";

export const router = createBrowserRouter([
  // 🌐 公開ページ
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <ArticleListPage myOnly={false} /> },
      { path: "/article", element: <ArticleListPage myOnly={false} /> },
      { path: "/article/:id", element: <ArticleDetailPage /> },
    ],
  },

  // 🔐 認証ページ
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },

  // 🔒 ログイン必須
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/article/my", element: <ArticleListPage myOnly={true} /> },
          { path: "/article/edit", element: <AriticleEditPage /> },
          { path: "/article/update/:id", element: <AriticleUpdatePage /> },
          { path: "/bookmark", element: <BookmarkPage /> },
          { path: "/mypage", element: <DashboardPage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
