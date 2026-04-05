// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5598d8", // ボタン・リンクなどのアクセント
      dark: "#1e3a5c", // ヘッダー背景
      light: "#8aaed0", // ナビゲーションテキスト
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1c2e4a", // 本文テキスト（濃いネイビー）
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f7fa", // ページ背景
      paper: "#ffffff", // カード・サーフェス
    },
    text: {
      primary: "#1c2e4a", // メインテキスト
      secondary: "#526680", // サブテキスト・メタ情報
    },
    divider: "#dde4ee",
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif",
    ].join(","),
    h1: { fontSize: "2rem", fontWeight: 500, color: "#1c2e4a" },
    h2: { fontSize: "1.5rem", fontWeight: 500, color: "#1c2e4a" },
    h3: { fontSize: "1.25rem", fontWeight: 500, color: "#1c2e4a" },
    body1: { fontSize: "1rem", lineHeight: 1.7, color: "#1c2e4a" },
    body2: { fontSize: "0.875rem", lineHeight: 1.6, color: "#526680" },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e3a5c",
          boxShadow: "none",
          borderBottom: "0.5px solid #2a4a70",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "0.5px solid #dde4ee",
          boxShadow: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#dce8f5",
          color: "#1e3a5c",
          fontWeight: 500,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
      },
    },
    // OutlinedInput（枠線ありの入力欄）全体に適用
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // // フォーカス状態（.Mui-focused）の時、中にあるSVGアイコンの色を変える
          // "&.Mui-focused .MuiSvgIcon-root": {
          //   color: "#1976d2", // あなたのプライマリカラー（青など）
          // },
          "&.Mui-focused": {
            backgroundColor: "#e8f0ff", // ここでアイコン部分も含めた背景色を指定
          },
          // 1. 自動入力された時、枠全体の背景色をその色（薄い青）に合わせる
          "&:has(input:-webkit-autofill)": {
            backgroundColor: "#e8f0fe !important", // ブラウザ標準の自動入力色に近い色
          },
        },
      },
    },
  },
});

export default theme;
