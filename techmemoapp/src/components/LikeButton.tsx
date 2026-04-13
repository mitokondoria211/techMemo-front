import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { likeApi } from "../features/article/likeApi";
type LikeButtonProps = {
  articleId: number;
  likeCount: number;
  likedByMe: boolean;
  isLikeDisabled: boolean;
  onUpdated?: () => void;
};
const LikeButton = ({
  articleId,
  likeCount,
  likedByMe,
  isLikeDisabled,
  onUpdated,
}: LikeButtonProps) => {
  const [liked, setLiked] = useState(likedByMe);
  const [count, setCount] = useState(likeCount);

  const handleLike = async () => {
    try {
      if (liked) {
        await likeApi.unlikeArticle(articleId);
        setCount((c) => c - 1);
      } else {
        await likeApi.likeArticle(articleId);
        setCount((c) => c + 1);
      }
      setLiked(!liked);
      onUpdated?.();
    } catch {
      console.error("liked error");
    }
  };
  return (
    <Box sx={{ borderRadius: 100 }}>
      <IconButton onClick={handleLike} color="error" disabled={isLikeDisabled}>
        {liked ?
          <FavoriteIcon />
        : <FavoriteBorderIcon />}
      </IconButton>
      {count}
    </Box>
  );
};

export default LikeButton;
