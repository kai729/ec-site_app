import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  ButtonGroup,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { state, dispatch } = useCart();
  const { items } = state;

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const taxRate = 0.1;
  const totalWithTax = Math.floor(totalPrice * (1 + taxRate));

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  // フォーム用ステート追加
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    if (!name || !email || !address) {
      setFormError("すべての項目を入力してください");
      return;
    }
    dispatch({ type: "CLEAR_CART" });
    setOpenDialog(false);
    navigate("/thanks");
  };

  const [openDialog, setOpenDialog] = useState(false); // モーダル状態
  const handleOrder = () => {
    setOpenDialog(true);
  };

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseDialog = () => {
    setOpenDialog(false);
    dispatch({ type: "CLEAR_CART" }); // 仮で注文完了後カートを空に
  };

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          カート
        </Typography>

        {items.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="body1">カートは空です。</Typography>
          </Paper>
        ) : (
          <Paper sx={{ p: 3 }}>
            <List>
              {items.map((item) => (
                <ListItem
                  key={item.id}
                  divider
                  alignItems="center"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* 左側：画像＋テキスト */}
                  <Box display="flex" alignItems="center">
                    <Avatar variant="square" src={item.image} alt={item.title} sx={{ width: 56, height: 56, mr: 2 }} />
                    <ListItemText
                      primary={item.title}
                      secondary={`¥${item.price.toLocaleString()} × ${item.quantity}`}
                    />
                  </Box>

                  {/* 右側：数量操作＋削除 */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <ButtonGroup size="small" variant="outlined">
                      <IconButton
                        onClick={() => dispatch({ type: "DECREMENT_QUANTITY", payload: item.id })}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <IconButton onClick={() => dispatch({ type: "INCREMENT_QUANTITY", payload: item.id })}>
                        <AddIcon />
                      </IconButton>
                    </ButtonGroup>
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => {
                        dispatch({ type: "REMOVE_ITEM", payload: item.id });
                        setSnackbarMessage("商品を削除しました");
                        setOpenSnackbar(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">合計（税込）: ¥{totalWithTax.toLocaleString("ja-JP")}</Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    dispatch({ type: "CLEAR_CART" });
                    setSnackbarMessage("カートを空にしました");
                    setOpenSnackbar(true); // ← ここ追加！
                  }}
                >
                  カートを空にする
                </Button>
                <Button variant="contained" color="primary" onClick={handleOrder}>
                  注文する
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="info" variant="filled" elevation={6} sx={{ width: "100%" }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>ご注文情報の入力</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="お名前" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField
            label="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
          />
          <TextField label="お届け先住所" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />
          {formError && <Typography color="error">{formError}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>キャンセル</Button>
          <Button variant="contained" onClick={handleConfirmOrder}>
            注文を確定する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartPage;
