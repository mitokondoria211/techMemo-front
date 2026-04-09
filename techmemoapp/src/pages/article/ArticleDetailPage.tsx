import { Link as RouterLink, useParams } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { formatDateJa } from "../../util/time";
import LikeButton from "../../components/LikeButton";
import { useArticleDetail } from "../../features/article/useArticleDetail";
import { useAuth } from "../../features/auth/useAuth";

const ArticleDetailPage = () => {
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const { article } = useArticleDetail(Number(id));
  console.log(article);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 3, mb: 6 }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar />
              <Typography variant="body1">{article?.user.name}</Typography>
            </Stack>
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{ mt: 2 }}
            >
              {article?.title}
            </Typography>

            <Box sx={{ my: 1 }}>
              {article?.tags.map((tag) => (
                <Chip label={tag.name} sx={{ mr: 1 }} size="small" />
              ))}
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={3}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  更新日：
                  {article?.updatedAt ?
                    formatDateJa(article?.updatedAt)
                  : "不明"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  作成日：
                  {article?.createdAt ?
                    formatDateJa(article?.createdAt)
                  : "不明"}
                </Typography>
              </Box>

              {article?.category && (
                <Box>
                  <Chip
                    label={article.category.name}
                    sx={{ mr: 1 }}
                    size="small"
                  />
                </Box>
              )}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="body1"
              sx={{
                // lineHeight: 1.9,
                whiteSpace: "pre-wrap",
              }}
              className="markdown"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {article?.content}
              </ReactMarkdown>
            </Typography>
            {isAuthenticated && (
              <LikeButton
                articleId={Number(id)}
                likedByMe={article?.likedByme ?? false}
                likeCount={article?.likeCount ?? 0}
              />
            )}

            {article?.urls && article.urls.length > 0 && (
              <>
                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom>
                  参考サイト
                </Typography>

                <List>
                  {article.urls.map((url) => (
                    <ListItem key={url.id} disablePadding>
                      <ListItemText
                        primary={
                          <Link
                            href={url.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                          >
                            {url.title}
                          </Link>
                        }
                        // secondary={url.url}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </CardContent>
        </Card>
        <Button
          component={RouterLink}
          to="/article"
          startIcon={<ArrowBackIcon />}
        >
          一覧へ戻る
        </Button>
      </Box>
    </Container>
  );
};

export default ArticleDetailPage;
