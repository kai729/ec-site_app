import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/products";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Skeleton,
  Alert,
  Button,
  CardActions,
  Snackbar,
  CardActionArea,
} from "@mui/material";
import { Product } from "../types/Product";
import { useCart } from "../contexts/CartContext";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

const ProductListPage = ({ searchQuery, selectedCategory }: Props) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { dispatch } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  // 🔍 フィルター処理
  const filteredProducts = products?.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const MotionGridItem = motion(Grid);

  if (isLoading) {
    return (
      <Grid container spacing={2} justifyContent="center">
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid item key={i} sx={{ minWidth: 250, maxWidth: 300 }}>
            <Card>
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                <Skeleton width="80%" />
                <Skeleton width="60%" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return <Alert severity="error">商品データの取得に失敗しました</Alert>;
  }

  return (
    <>
      {/* 🛒 商品一覧 */}
      <Grid container spacing={2} justifyContent="space-evenly">
        {filteredProducts?.map((product, index) => (
          <MotionGridItem
            item
            xs={12}
            sm={4}
            key={product.id}
            sx={{ flexGrow: 1, minWidth: 250, maxWidth: 300 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card
              component={motion.div}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 250 }}
              sx={{
                width: "300px", // これ重要
                height: "100%", // 高さも統一するならこれも
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(10px)",
                borderRadius: 4,
                boxShadow: "0 6px 24px rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // カートボタンを下に寄せるなら
              }}
            >
              <CardActionArea component={Link} to={`/products/${product.id}`}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{ height: 180, objectFit: "contain", p: 2 }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} noWrap sx={{ color: "text.primary", mb: 0.5 }}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ¥{product.price.toLocaleString()}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button fullWidth variant="contained" color="primary" onClick={() => handleAddToCart(product)}>
                  カートに追加
                </Button>
              </CardActions>
            </Card>
          </MotionGridItem>
        ))}
      </Grid>

      {/* ✅ トースト */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          elevation={6}
          sx={{ width: "100%" }}
        >
          カートに追加しました
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ProductListPage;
