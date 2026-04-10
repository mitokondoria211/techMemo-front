# TechMemo フロントエンド

エンジニア向けの技術メモ共有アプリ「StackMemo」のフロントエンドリポジトリです。  
Spring Boot バックエンドと連携し、記事の投稿・閲覧・ブックマーク管理などを提供します。

---

## 技術スタック

| カテゴリ | 採用技術 |
|---|---|
| フレームワーク | React 19 + TypeScript |
| ビルドツール | Vite 7 |
| UIライブラリ | MUI (Material UI) v7 |
| スタイリング | MUI sx prop / Tailwind CSS v4 (補助) |
| ルーティング | React Router DOM v7 |
| フォーム管理 | React Hook Form + Zod |
| Markdownエディタ | CodeMirror 6 (@uiw/react-codemirror) |
| Markdownレンダリング | react-markdown + remark-gfm + remark-breaks |
| HTTPクライアント | Axios |
| 日付ユーティリティ | date-fns |
| Linter | ESLint 9 + typescript-eslint |

---

## 主な機能

- **記事一覧・検索** — キーワード / カテゴリ / タグによるフィルタリング、ページネーション
- **記事詳細** — Markdownレンダリング、コードシンタックスハイライト、いいね機能
- **記事投稿・編集** — split / write / preview の3モードエディタ、参考URL管理、未保存離脱ガード
- **公開/非公開切り替え** — 記事一覧から1クリックで可視性を変更
- **ブックマーク管理** — お気に入りサイトの登録・編集・削除
- **マイページ (ダッシュボード)** — 投稿数・下書き数・ブックマーク数の集計、最近の投稿一覧
- **認証** — JWTアクセストークン + HTTPOnlyリフレッシュトークン（Cookie）、自動トークンリフレッシュ

---

## ディレクトリ構成

```
src/
├── app/
│   ├── App.tsx              # ルートコンポーネント (スタブ)
│   ├── authContext.tsx      # AuthContext の定義
│   └── router.tsx           # React Router ルート定義
├── components/
│   ├── article/             # 記事関連コンポーネント (ArticleCard, エディタダイアログ等)
│   ├── bookmark/            # ブックマーク関連コンポーネント
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   ├── DeleteDialog.tsx
│   └── LikeButton.tsx
├── features/
│   ├── article/             # articleApi, useArticleList, useArticleDetail, likeApi
│   ├── auth/                # AuthProvider, authApi, PrivateRoute, useAuth
│   ├── bookmark/            # bookmarkApi, useBookmark
│   ├── category/            # categoryApi, useCategory
│   └── tag/                 # tagApi, useTag
├── hooks/
│   ├── useBeforeUnload.ts   # ブラウザの離脱確認
│   └── useUnsavedChangesWarning.ts  # SPA内ナビゲーション離脱確認
├── layouts/
│   ├── MainLayout.tsx       # Header + Sidebar + Outlet
│   └── AuthLayout.tsx       # (スタブ)
├── pages/
│   ├── article/             # ArticleListPage, ArticleDetailPage, ArticleEditPage, ArticleUpdatePage
│   ├── auth/                # LoginPage, SignUpPage
│   ├── bookmark/            # BookmarkPage
│   ├── dashboard/           # DashBoardPage
│   └── NotFoundPage.tsx
├── schema/
│   └── schema.ts            # Zod バリデーションスキーマ
├── services/
│   └── axios.ts             # publicApi / privateApi (インターセプター付き)
├── theme/
│   └── theme.ts             # MUI カスタムテーマ
├── types/                   # TypeScript 型定義 (article, auth, bookmark, etc.)
└── util/                    # 日付フォーマット、バリデーションメッセージ等
```

---

## セットアップ

### 必要環境

- Node.js 20+
- npm 8+

### インストール

```bash
git clone <このリポジトリのURL>
cd techmemoapp
npm install
```

### 環境設定

`src/services/axios.ts` の `BASE_URL` をバックエンドのURLに合わせて変更してください。

```ts
// src/services/axios.ts
const BASE_URL = "http://localhost:8080/api/v1"; // ローカル開発時
```

デフォルトは Render にデプロイされたバックエンドに接続します。

### 開発サーバー起動

```bash
npm run dev
```

`http://localhost:5173` で起動します。

### ビルド

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## 認証フロー

```
ログイン
  └─ POST /auth/authenticate
       ├─ アクセストークン → localStorage に保存
       └─ リフレッシュトークン → HTTPOnly Cookie に保存

API リクエスト (privateApi)
  └─ Authorization: Bearer <accessToken> を自動付与

401 エラー時
  └─ POST /auth/refresh-token → 新しいアクセストークンを取得して再試行
       └─ 失敗時 → /login にリダイレクト
```

---

## ルート一覧

| パス | 認証 | 説明 |
|---|---|---|
| `/` または `/article` | 不要 | 記事一覧（全公開記事） |
| `/article/:id` | 不要 | 記事詳細 |
| `/login` | 不要 | ログイン |
| `/signup` | 不要 | 新規登録 |
| `/article/my` | 必要 | 自分の記事一覧 |
| `/article/edit` | 必要 | 記事投稿 |
| `/article/update/:id` | 必要 | 記事編集 |
| `/bookmark` | 必要 | ブックマーク管理 |
| `/mypage` | 必要 | ダッシュボード |

---

## バックエンド

Spring Boot 製 REST API と連携します。  
デフォルトエンドポイント: `https://techmemo-p29y.onrender.com/api/v1`

主な API エンドポイント:

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/articles` | 記事一覧 (公開) |
| GET | `/articles/search` | 記事検索 |
| GET | `/articles/me` | 自分の記事一覧 |
| GET | `/articles/:id` | 記事詳細 |
| POST | `/articles` | 記事作成 |
| PUT | `/articles/:id` | 記事更新 |
| PATCH | `/articles/:id/visibility` | 公開/非公開切り替え |
| DELETE | `/articles/:id` | 記事削除 |
| POST | `/articles/:id/likes` | いいね / いいね取り消し |
| GET/POST/PUT/DELETE | `/bookmarks` | ブックマーク CRUD |
| POST | `/auth/authenticate` | ログイン |
| POST | `/auth/register` | 新規登録 |
| POST | `/auth/refresh-token` | トークンリフレッシュ |

---

## 既知の課題・今後の対応予定

- `LikeButton` のいいね状態がリロード後にリセットされる（`likedByMe` を API から毎回取得することで解消予定）
- `ArticleEditPage` と `ArticleUpdatePage` にほぼ重複したコードが存在する → 共通 `ArticleEditor` コンポーネントへのリファクタリングを予定
- `PrivateRoute` の `isAuthenticated === null` チェックは型定義（`boolean`）と乖離している → 初期化フラグの導入を検討中
- `DashboardPage` の `useEffect` 依存配列が空のため ESLint 警告が発生する
