import { Button, Container, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography variant="h4">404 - ページが見つかりません</Typography>
      <Button href="/">トップへ戻る</Button>
    </Container>
  );
};

export default NotFoundPage;
