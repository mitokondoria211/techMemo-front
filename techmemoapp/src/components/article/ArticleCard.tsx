import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { formatDateJa } from "../../util/time";
import { Link, useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import DeleteDialog from "../DeleteDialog";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useArticleDetail } from "../../features/article/useArticleDetail";
import type { ArticleResponse } from "../../types/article";
type ArticleCardProps = {
  article: ArticleResponse;
  myOnly: boolean;
  onTagClick?: (tagId: number) => void;
  onCategoryClick?: (categoryId: number) => void;
  onUpdated?: () => void;
};

/**
 * 記事一覧の際の一つ一つのカードを表示するコンポーネント
 * @param props
 * @returns
 */
const ArticleCard = ({
  article,
  myOnly,
  onTagClick,
  onCategoryClick,
  onUpdated,
}: ArticleCardProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  // 公開状態を管理するステート（実際のアプリではPropsで受け取る想定）
  const navigate = useNavigate();
  const { updateVisibility, loading, deleteArticle } = useArticleDetail();
  const handleTogglePublish = async () => {
    if (loading) return;
    await updateVisibility(article.id, !article.publicFlag);
    onUpdated?.(); // ← 親に通知
  };

  /**
   * カードの編集ボタンを押下した際、updateページに遷移
   */
  const handleGoToUpdatePage = () => {
    navigate(`/article/update/${article.id}`);
  };

  /**
   * 記事を削除するときの処理
   */
  const handleDeleteArticle = async () => {
    if (loading) return;
    await deleteArticle(article.id);
    onUpdated?.();
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: "0.2s",
        "&:hover": { boxShadow: 6 },
        height: "100%",
      }}
    >
      <Link to={`/article/${article.id}`}>
        <CardContent>
          {/* Title */}
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
          >
            <Chip
              label={article.category.name}
              color="primary"
              size="small"
              clickable
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onCategoryClick?.(article.category.id);
              }}
              sx={{
                alignSelf: "flex-start", // これで左寄せ（横幅いっぱいにならない）
                backgroundColor: "#E6FFFA", // 以前提案した淡い青緑
                color: "#2C7A7B", // 濃い青緑
                fontWeight: "bold",
                borderRadius: "4px", // 少し角を立たせると知的な印象に
                fontSize: "0.75rem",
              }}
            />
            <Stack>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" fontWeight="bold">
                  {article.title}
                </Typography>
              </Box>
            </Stack>

            {/* Tags を表示する*/}
            <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
              {article.tags.map((tag) => (
                <Chip
                  key={tag.name}
                  label={tag.name}
                  size="small"
                  variant="outlined"
                  clickable
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onTagClick?.(tag.id);
                  }}
                />
              ))}
            </Stack>

            <Divider sx={{ mt: 1, mb: 2 }} />

            {/* Meta Info */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              {/* 自分の記事ではない場合は著者名を表示する */}
              {!myOnly && (
                <Typography
                  variant="caption"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Avatar sx={{ width: 24, height: 24 }}></Avatar>
                  {article.user.name.length > 15 ?
                    article.user.name.slice(0, 15) + "..."
                  : article.user.name}
                </Typography>
              )}
              <Stack direction="row">
                <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2">
                  {formatDateJa(article.createdAt)}
                </Typography>
              </Stack>
              {myOnly && (
                <Box display="flex" gap={2}>
                  {/* 状態に応じて公開/非公開ボタンを切り替え（排他表示） */}
                  {article.publicFlag ?
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<LockIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleTogglePublish();
                      }}
                    >
                      非公開にする
                    </Button>
                  : <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      startIcon={<PublicIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleTogglePublish();
                      }}
                    >
                      公開する
                    </Button>
                  }

                  <Button
                    size="small"
                    color="secondary" // またはデフォルトのまま
                    variant="text"
                    startIcon={<EditIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleGoToUpdatePage();
                    }}
                  >
                    編集
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    variant="outlined" // または "text" に変更
                    startIcon={<DeleteIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setDeleteOpen(true);
                    }}
                  >
                    削除
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Link>
      <DeleteDialog
        title={"記事削除"}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onSubmit={() => handleDeleteArticle()}
      />
    </Card>
  );
};

export default ArticleCard;
