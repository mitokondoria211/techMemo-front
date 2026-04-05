import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DescriptionIcon from "@mui/icons-material/Description";
const SIDEBAR_WIDTH = 240;

const navItems = [
  { label: "記事一覧", path: "/article", icon: <ArticleIcon /> },
  { label: "記事投稿", path: "/article/edit", icon: <ModeEditIcon /> },
  { label: "My記事", path: "/article/my", icon: <DescriptionIcon /> },
  { label: "ブックマーク", path: "/bookmark", icon: <BookmarkIcon /> },
  { label: "マイページ", path: "/mypage", icon: <PersonIcon /> },
];

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        widows: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          position: "fixed",
        },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{ gap: 1, py: 2 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
