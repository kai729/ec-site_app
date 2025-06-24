// src/pages/ThanksPage.tsx
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ThanksPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        ご注文ありがとうございます！
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        ご入力いただいた内容を確認のうえ、発送準備に入ります。
      </Typography>
      <Button variant="contained" component={Link} to="/">
        トップに戻る
      </Button>
    </Container>
  );
};

export default ThanksPage;
