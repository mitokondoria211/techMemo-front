import { AppBar, Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <AppBar
        component="footer"
        position="static"
        sx={{ backgroundColor: "#000000" }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption">©2026 tadahito-blog</Typography>
          </Box>
        </Container>
      </AppBar>
    </>
  );
};

export default Footer;
