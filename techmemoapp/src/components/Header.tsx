import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import type { User } from "../types/auth";
import { useAuth } from "../features/auth/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
type HeaderProps = {
  user: User | null;
  toggleSidebar: () => void;
};

const Header = ({ user, toggleSidebar }: HeaderProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <AppBar
        component="header"
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 60,
              maxHeight: 80,
              paddingLeft: 3,
            }}
          >
            {user && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleSidebar}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "1.5rem",
                fontWeight: 800,
                lineHeight: 1,
                color: "white",
                textDecoration: "none",
              }}
            >
              <img
                src="/logo.svg"
                width={36}
                height={36}
                style={{ display: "block", transform: "translateY(2px)" }}
              />
              TechMemo
            </Typography>
          </Box>
          <Box sx={{ px: 3, color: "white" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              {user ?
                <Stack
                  direction="row"
                  gap={2}
                  sx={{ color: "white", alignItems: "center" }}
                >
                  <Avatar />
                  <Typography color="white">
                    {user.name.length > 15 ?
                      user.name.slice(0, 15) + "..."
                    : user.name}
                  </Typography>
                  <Button
                    startIcon={<LogoutIcon />}
                    variant="contained"
                    onClick={handleLogout}
                  >
                    ログアウト
                  </Button>
                </Stack>
              : <Typography
                  sx={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/login">
                    <LoginIcon />
                    ログイン
                  </Link>
                </Typography>
              }
            </Box>
            <List
              component="nav"
              sx={{ display: "flex", justifyContent: "flex-start" }}
            ></List>
          </Box>
        </Box>
      </AppBar>
    </>
  );
};

export default Header;
