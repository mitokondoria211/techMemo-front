import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type DeleteDialogProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const DeleteDialog = ({
  title,
  open,
  onClose,
  onSubmit,
}: DeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>本当に削除しますか？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose} autoFocus>
          いいえ
        </Button>
        <Button color="error" onClick={onSubmit}>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
