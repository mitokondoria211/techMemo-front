import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  bookmarkCreateSchema,
  type BookmarkCreateForm,
} from "../../schema/schema";

type BookmarkCreateDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BookmarkCreateForm) => Promise<void>;
};

const BookmarkCreateDialog = ({
  open,
  onClose,
  onSubmit,
}: BookmarkCreateDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // ← isSubmitting を追加
    reset,
  } = useForm<BookmarkCreateForm>({
    resolver: zodResolver(bookmarkCreateSchema),
  });
  // const [successOpen, setSuccessOpen] = useState(false);
  // const [errorOpen, setErrorOpen] = useState(false);
  const handleClose = () => {
    reset(); // ← ダイアログを閉じる時にフォームをリセット
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>お気に入りサイト追加</DialogTitle>
        <DialogContent>
          <Stack gap={2} my={1}>
            <TextField
              variant="outlined"
              label="タイトル"
              defaultValue=""
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            ></TextField>
            <TextField
              variant="outlined"
              label="サイトURL"
              defaultValue=""
              {...register("url")}
              error={!!errors.url}
              helperText={errors.url?.message}
            ></TextField>
            <TextField
              variant="outlined"
              label="メモ"
              defaultValue=""
              multiline
              rows={3}
              {...register("memo")}
              error={!!errors.memo}
              helperText={errors.memo?.message}
            ></TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="secondary" onClick={onClose}>
            キャンセル
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            追加
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default BookmarkCreateDialog;
