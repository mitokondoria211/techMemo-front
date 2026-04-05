import type { BookmarkRequest, BookmarkResponse } from "../../types/bookmark";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import DeleteDialog from "../DeleteDialog";
import { useBookmark } from "../../features/bookmark/useBookmark";
import BookmarkUpdateDialog from "./BookmarkUpdateDialog";

type BookmarkCardProps = {
  bookmark: BookmarkResponse;
  onUpdated?: () => void;
};

const BookmarkCard = ({ bookmark, onUpdated }: BookmarkCardProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { deleteBookmark, updateBookmark } = useBookmark();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = async (request: BookmarkRequest) => {
    await updateBookmark(bookmark.id, request);
    onUpdated?.();
    setEditOpen(false);
  };

  const handleDelete = async () => {
    await deleteBookmark(bookmark.id);
    onUpdated?.();
    setDeleteOpen(false);
  };
  return (
    <Paper>
      <Card sx={{ height: 120 }}>
        {/* <CardHeader
          title={bookmark.title}
          subheader={bookmark.memo}
          action={
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          }
        /> */}
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">
              <Link
                href={bookmark.url}
                underline="none"
                target="_blank"
                rel="noopener noreferrer"
              >
                {bookmark.title}
              </Link>
            </Typography>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Typography variant="body1">{bookmark.memo}</Typography>
        </CardContent>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={() => setEditOpen(true)}>編集</MenuItem>
          <MenuItem onClick={() => setDeleteOpen(true)}>削除</MenuItem>
        </Menu>

        <BookmarkUpdateDialog
          bookmark={bookmark}
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSubmit={handleEdit}
        />
        <DeleteDialog
          title="お気に入りサイトの削除"
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onSubmit={handleDelete}
        />
        {/* <CardContent>
          
        </CardContent> */}
      </Card>
    </Paper>
  );
};

export default BookmarkCard;
