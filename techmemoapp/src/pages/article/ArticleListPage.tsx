import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArticleCard from "../../components/article/ArticleCard";

import SearchIcon from "@mui/icons-material/Search";
import { useCategory } from "../../features/category/useCategory";
import { useState } from "react";
import { useArticleList } from "../../features/article/useArticleList";
import { useTag } from "../../features/tag/useTag";

type ArticleListPageProps = {
  myOnly: boolean;
};

const ArticleListPage = ({ myOnly }: ArticleListPageProps) => {
  const {
    articles,
    loading,
    error,
    page,
    totalPages,
    keyword,
    categoryId,
    tagId,
    fetchArticles,
    clearTagId,
    changePage,
    setCategoryId,
    handleSearch,
    handleTagClick,
    formatSearchResult,
    resetSearchConditions,
  } = useArticleList({ myOnly: myOnly });
  const { categories } = useCategory();
  const { getTagName } = useTag();
  const [keywordInput, setKeywordInput] = useState<string>(keyword);
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    changePage(value);
  };

  const [searchOpen, setSearchOpen] = useState(false);

  const handleResetSearch = () => {
    setSearchOpen(false);
    resetSearchConditions();
  };

  if (error) return <div>{error}</div>;
  return (
    <Container
      maxWidth={false}
      sx={{
        px: 2,
        mx: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box width="75%">
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ my: 1, position: "sticky", gap: 2, alignItems: "center" }}
        >
          <Stack direction="row" alignItems="center">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              記事一覧
            </Typography>
            {searchOpen ?
              <IconButton size="small" onClick={() => setSearchOpen(false)}>
                <ExpandLessIcon />
              </IconButton>
            : <IconButton size="small" onClick={() => setSearchOpen(true)}>
                <ExpandMoreIcon />
              </IconButton>
            }
          </Stack>
          {!loading && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Chip label={formatSearchResult()} size="small" />
            </Box>
          )}
        </Stack>
        {searchOpen && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Stack direction="row" gap={2}>
              <TextField
                placeholder="キーワードで検索"
                size="small"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSearch(keywordInput)
                } // Enterでも検索可能に
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  maxWidth: 400,
                  width: 240,
                  "& .MuiInputBase-root": {
                    height: 32,
                  },
                  "& .MuiInputBase-input": {
                    padding: "4px 8px",
                    fontSize: 14,
                  },
                }}
              />
              <FormControl
                size="small"
                sx={{ minWidth: 160, bgcolor: "background.paper" }}
              >
                <InputLabel sx={{ fontSize: 14 }}>カテゴリ</InputLabel>
                <Select
                  value={categoryId ?? ""}
                  label="カテゴリ"
                  onChange={(e) => {
                    const val = e.target.value;
                    setCategoryId(val);
                  }}
                  displayEmpty
                  sx={{
                    height: 32,
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      padding: "0 8px",
                      fontSize: 14,
                    },
                  }}
                >
                  {/* <MenuItem value="">すべて</MenuItem> */}
                  {categories.map((c) => (
                    <MenuItem key={c.name} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* // 選択中タグの表示 + 解除ボタン */}
              {tagId && (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Chip
                    label={`タグ: ${getTagName(tagId)}`}
                    onDelete={clearTagId}
                    color="primary"
                    size="small"
                  />
                </Box>
              )}
              <IconButton
                size="small"
                sx={{ color: "black" }}
                onClick={() => handleSearch(keywordInput)}
              >
                <SearchIcon />
              </IconButton>
              <Button size="small" onClick={handleResetSearch}>
                検索条件をクリア
              </Button>
            </Stack>
          </Box>
        )}

        <Box display="flex" flexDirection="column" gap={3}>
          {loading ?
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="70vh"
            >
              <CircularProgress size={64} thickness={4} />
            </Box>
          : <>
              {articles.length === 0 ?
                <Typography
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="70vh"
                  component="h1"
                  textAlign="center"
                  color="error"
                  sx={{ mt: 3 }}
                >
                  条件に一致する記事がありませんでした
                </Typography>
              : articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    myOnly={myOnly}
                    onTagClick={handleTagClick}
                    onCategoryClick={setCategoryId}
                    onUpdated={fetchArticles}
                  ></ArticleCard>
                ))
              }
              {articles.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    my: 3,
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                    color="secondary"
                  />
                </Box>
              )}
            </>
          }
        </Box>
      </Box>
    </Container>
  );
};

export default ArticleListPage;
