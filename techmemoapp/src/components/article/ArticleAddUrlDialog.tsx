import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

type UrlItem = {
  title: string;
  url: string;
};

type ArtilceAddUrlDialogProps = {
  open: boolean;
  onClose: () => void;
  value: UrlItem[];
  onSave: (urls: UrlItem[]) => void;
};

const ArticleAddUrlDialog = ({
  open,
  onClose,
  value,
  onSave,
}: ArtilceAddUrlDialogProps) => {
  const [list, setList] = useState<UrlItem[]>(value || []);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  // 記事の参照url追加
  const handleAdd = () => {
    if (!url) {
      setError("URLは必須です");
      return;
    }

    if (list.length > 5) {
      setError("URLは5つまで追加できます。");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("正しいURLを入力してください");
      return;
    }

    setList((prev) => [
      ...prev,
      {
        title: title || new URL(url).hostname,
        url,
      },
    ]);

    //title, url, errorを初期化
    setTitle("");
    setUrl("");
    setError("");
  };

  // 削除
  const handleDelete = (index: number) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  // 保存
  const handleSave = () => {
    onSave(list);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>🔗 参照URLを管理</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* 入力欄 */}
          <Stack direction="row" spacing={1}>
            <Box display="flex" flex={1} flexDirection="column" gap={2}>
              <TextField
                label="タイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="small"
                fullWidth
              />

              <TextField
                label="URL"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                size="small"
                error={!!error}
                helperText={error}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdd();
                }}
                fullWidth
              />
            </Box>

            <Button variant="contained" onClick={handleAdd}>
              追加
            </Button>
          </Stack>

          {/* 一覧 */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              追加済みURL
            </Typography>

            {list.length === 0 && (
              <Typography color="text.secondary" fontSize={13}>
                まだ追加されていません
              </Typography>
            )}

            <Stack spacing={1}>
              {list.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                  }}
                >
                  <Box>
                    <Typography fontSize={14}>{item.title}</Typography>
                    <Typography fontSize={12} color="text.secondary">
                      {item.url}
                    </Typography>
                  </Box>

                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button variant="contained" onClick={handleSave}>
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArticleAddUrlDialog;
