import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import { useState } from "react";
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
import PersonIcon from "@mui/icons-material/Person";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpForm } from "../../schema/schema";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const toggleShowPassword = () => setShowPassword((t) => !t);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((t) => !t);

  const handleFormSubmit = async (data: SignUpForm) => {
    // e.preventDefault();
    try {
      setLoading(true);
      await signUp(data);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError("root", {
        type: "server",
        message: "認証に失敗しました。",
      });
      console.error("login faild", err);
    }
  };

  // マウスダウンでフォーカスが外れるのを防ぐ（よくある小技）
  // const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  // };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        py: 4,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{
          // minHeight: "100vh",
          display: "grid",
          width: "100%",
          placeItems: "center",
          py: 3,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            px: 6,
            py: 4,
            maxWidth: 400,
            width: "100%",
            borderRadius: 3,
          }}
        >
          <Stack spacing={2.5}>
            <Typography variant="h5" textAlign="center">
              新規登録
            </Typography>
            {loading && <CircularProgress size={64} thickness={4} />}
            {errors.root && (
              <Alert severity="error">{errors.root.message}</Alert>
            )}

            <TextField
              {...register("name")}
              label="ユーザー名"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* 2. メールアドレス */}
            <TextField
              {...register("email")}
              label="メールアドレス"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
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
              {...register("password")}
              label="パスワード"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ?
                          <VisibilityOffIcon />
                        : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              {...register("confirmPassword")}
              label="確認用パスワード"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
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
                        onClick={toggleShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ?
                          <VisibilityOffIcon />
                        : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* 4. 確認用パスワード */}
            {/* 同様にstartAdornmentを入れる */}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 1, py: 1.5, fontWeight: "bold" }}
            >
              登録する
            </Button>

            {/* <Stack direction="row" spacing={2} alignItems="center">
              <KeyIcon />
              <TextField
                fullWidth
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                label="パスワード"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                placeholder="パスワード"
                slotProps={{
                  input: {
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
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <CheckCircleOutlineIcon />
              <TextField
                fullWidth
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                label="再確認パスワード"
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="再確認パスワード"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showConfirmPassword ? "Hide password" : (
                              "Show password"
                            )
                          }
                          onClick={toggleShowConfirmPassword}
                          onMouseDown={handleMouseDown}
                          edge="end"
                        >
                          {showConfirmPassword ?
                            <VisibilityOffIcon />
                          : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack> */}

            {/* <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<PersonAddIcon />}
              sx={{
                alignSelf: "center",
                px: 4,
              }}
            >
              新規登録
            </Button> */}

            <Typography textAlign="center" variant="body2">
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                ログインへ
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUpPage;
