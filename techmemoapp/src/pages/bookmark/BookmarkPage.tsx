import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useBookmark } from "../../features/bookmark/useBookmark";
import BookmarkCard from "../../components/bookmark/BookmarkCard";
import AddIcon from "@mui/icons-material/Add";
import BookmarkCreateDialog from "../../components/bookmark/BookmarkCreateDialog";
import { useState } from "react";
import type { BookmarkCreateForm } from "../../schema/schema";

const BookmarkPage = () => {
  const { bookmarks, loading, fetchBookmarks, createBookmark } = useBookmark();
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const handleCreateSubmit = async (data: BookmarkCreateForm) => {
    try {
      console.log(data);
      await createBookmark(data);
      await fetchBookmarks(); // 一覧を再取得
      setSuccessOpen(true);
      setOpen(false);
    } catch {
      setErrorOpen(true);
    }
  };
  return (
    <Container maxWidth={false}>
      <Stack gap={2}>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Typography variant="h2">お気に入りサイト</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            追加
          </Button>
        </Box>

        {loading ?
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="70vh"
          >
            <CircularProgress size={64} thickness={4} />
          </Box>
        : <Stack mb={2}>
            <Grid container spacing={2} alignItems="stretch">
              {bookmarks.map((bookmark) => (
                <Grid size={{ xs: 12, md: 4 }} key={bookmark.id}>
                  <BookmarkCard
                    bookmark={bookmark}
                    onUpdated={fetchBookmarks}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        }
      </Stack>

      <BookmarkCreateDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreateSubmit}
      />
      <Snackbar
        open={successOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1000}
        onClose={() => {
          setSuccessOpen(false);
        }}
      >
        <Alert severity="success" variant="filled">
          作成が完了しました
        </Alert>
      </Snackbar>

      {/* 失敗 */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorOpen}
        autoHideDuration={10000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert severity="error" variant="filled">
          作成に失敗しました
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookmarkPage;
