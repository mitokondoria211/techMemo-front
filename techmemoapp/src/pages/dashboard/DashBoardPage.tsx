import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useArticleList } from "../../features/article/useArticleList";
import { useEffect, useState } from "react";
import type { ArticleResponse } from "../../types/article";
import { formatDateJa } from "../../util/time";
import { useBookmark } from "../../features/bookmark/useBookmark";

const DashboardPage = () => {
  const {
    fetchMyArticlesCount,
    fetchMyArticlesCountAndPrivate,
    fetchMyRecentArticles,
  } = useArticleList();
  const { fetchBookmarksCount } = useBookmark();
  const [articleCount, setArticleCount] = useState<number | null>(null);
  const [privateCount, setPrivateCount] = useState<number | null>(null);
  const [bookmarkCount, setBookmarkCount] = useState<number | null>(null);
  const [recentArticles, setRecentArticles] = useState<ArticleResponse[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await fetchMyArticlesCount();
        const privateCount = await fetchMyArticlesCountAndPrivate();
        const recentArticles = await fetchMyRecentArticles();
        const bookmarkCount = await fetchBookmarksCount();
        setArticleCount(count);
        setPrivateCount(privateCount);
        setRecentArticles(recentArticles);
        setBookmarkCount(bookmarkCount);
      } catch {
        setArticleCount(null);
        setPrivateCount(null);
        setRecentArticles([]);
        setBookmarkCount(null);
      }
    };

    fetchData();
  }, []);
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" mb={2}>
        マイページ
      </Typography>
      <Stack spacing={4} mt={2}>
        {/* KPIカード */}
        <Grid container spacing={2}>
          {[
            { label: "記事数", value: articleCount ?? "不明" },
            { label: "下書き", value: privateCount ?? "不明" },
            { label: "ブックマーク数", value: bookmarkCount },
          ].map((item) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.label}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={2}>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}:
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {item.value}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 最近の記事 */}
        <Box>
          <Typography variant="h6" mb={2}>
            最近の投稿
          </Typography>

          <Stack spacing={1} mb={1}>
            {recentArticles.map((item) => (
              <Card key={item.id}>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDateJa(item.updatedAt)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default DashboardPage;
