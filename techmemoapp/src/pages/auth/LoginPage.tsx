import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { loginSchema, type LoginForm } from "../../schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => setShowPassword((t) => !t);

  const onSubmit = async (form: LoginForm) => {
    try {
      setLoading(true);
      // await sleep(5000);
      await login(form);
      setLoading(false);
      navigate("/");
    } catch {
      setLoading(false);
      setError("root", {
        type: "server",
        message: "認証に失敗しました。",
      });
    }
  };

  // マウスダウンでフォーカスが外れるのを防ぐ（よくある小技）
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            px: 6,
            py: 4,
            maxWidth: 400,
            width: "100%",
            borderRadius: 3,
          }}
        >
          <Stack spacing={3.5}>
            <Typography variant="h5" textAlign="center">
              ログイン
            </Typography>
            {loading && (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            )}
            {errors.root && (
              <Alert severity="error">{errors.root.message}</Alert>
            )}
            <TextField
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              id="outlined-basic"
              label="メールアドレス"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              id="outlined-basic"
              label="パスワード"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={toggleShowPassword}
                        onMouseDown={handleMouseDown}
                        edge="end"
                      >
                        {showPassword ?
                          <VisibilityOffIcon />
                        : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              startIcon={<LoginIcon />}
              sx={{ mt: 1, py: 1.5, fontWeight: "bold" }}
            >
              ログイン
            </Button>

            <Typography textAlign="center" variant="body2">
              <Link
                to={"/signup"}
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                新規登録へ
              </Link>
            </Typography>
            <Typography textAlign="center" variant="body2">
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                ログインなしでサイトを見る
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
