import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import type z from "zod";
import type { articleEditSchema } from "../../schema/schema";
import { useWatch, type Control } from "react-hook-form";
import { useAuth } from "../../features/auth/useAuth";
import { formatDateJa } from "../../util/time";
import { useCategory } from "../../features/category/useCategory";

type ArticleConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  control: Control<
    z.input<typeof articleEditSchema>,
    undefined,
    z.output<typeof articleEditSchema>
  >;
  isPublic: boolean;
};

const ArticleConfirmDialog = ({
  open,
  onClose,
  onSubmit,
  control,
  isPublic,
}: ArticleConfirmDialogProps) => {
  const form = useWatch({ control });
  const { user } = useAuth();
  const { getCategoryName } = useCategory();
  const categoryName =
    form.categoryId ? getCategoryName(form.categoryId) : "未選択";
  const tags =
    typeof form.tags === "string" ?
      form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : (form.tags ?? []);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isPublic ? "公開投稿の確認" : "下書き保存の確認"}
      </DialogTitle>

      <DialogContent>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar />
              <Typography variant="body1">{user?.name}</Typography>
            </Stack>
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{ mt: 2 }}
            >
              {form.title}
            </Typography>

            <Box sx={{ my: 1 }}>
              {tags.map((tag) => (
                <Chip key={tag} label={tag} sx={{ mr: 1 }} size="small" />
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
                  更新日：{formatDateJa(new Date())}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  作成日：{formatDateJa(new Date())}
                </Typography>
              </Box>

              <Box>
                <Chip label={categoryName} sx={{ mr: 1 }} size="small" />
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                overflow: "auto",
                px: 2,
              }}
              className="markdown"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {form.content}
              </ReactMarkdown>
            </Box>

            {form.url && form.url.length > 0 && (
              <>
                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom>
                  参考サイト
                </Typography>

                <List>
                  {form.url.map((url) => (
                    <ListItem key={url.title} disablePadding>
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
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            <Box sx={{ mt: 2 }}></Box>
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button color="error" onClick={onSubmit}>
          投稿する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArticleConfirmDialog;
