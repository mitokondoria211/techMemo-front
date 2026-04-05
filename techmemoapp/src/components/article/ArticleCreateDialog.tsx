import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type ArticleCreateDialogProps = {
  open: boolean;
  onClose: () => void;
};

const ArticleCreateDialog = ({ open, onClose }: ArticleCreateDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <form action="">
        <DialogTitle>確認</DialogTitle>

        <DialogContent>本当に削除しますか？</DialogContent>

        <DialogActions>
          <Button onClick={onClose}>キャンセル</Button>
          <Button color="error">削除</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ArticleCreateDialog;
