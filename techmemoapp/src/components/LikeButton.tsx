import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
type LikeButtonProps = {
  likeCount: number;
};
const LikeButton = ({ likeCount }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <Box sx={{ borderRadius: 100 }}>
      <IconButton onClick={handleLike} color="error">
        {liked ?
          <FavoriteIcon />
        : <FavoriteBorderIcon />}
      </IconButton>
      {likeCount}
    </Box>
  );
};

export default LikeButton;
