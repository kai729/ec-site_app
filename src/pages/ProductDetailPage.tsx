import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/products";
import { useCart } from "../contexts/CartContext";
import { Product } from "../types/Product";
import { Box, Container, Typography, Skeleton, Alert, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId!),
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={4}>
          <Skeleton variant="rectangular" width="100%" height={300} />
          <Box flex={1}>
            <Skeleton width="60%" />
            <Skeleton width="80%" />
            <Skeleton width="40%" />
          </Box>
        </Box>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">商品データの取得に失敗しました。</Alert>
      </Container>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: { ...product, quantity: 1 } });
  };

  // 仮の複数画像データ（複製）
  const images = [product.image, product.image, product.image];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={4} alignItems="flex-start">
          {/* 画像カルーセル */}
          <Box sx={{ width: { xs: "100%", sm: 400 }, flexShrink: 0 }}>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              style={{ borderRadius: "12px", overflow: "hidden" }}
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <Box
                    component="img"
                    src={img}
                    alt={product.title}
                    sx={{ width: "100%", height: 400, objectFit: "contain" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          {/* 商品情報 */}
          <Box flex={1}>
            <Typography variant="h4" gutterBottom fontWeight={700}>
              {product.title}
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph fontWeight={600}>
              ¥{product.price.toLocaleString()}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              カテゴリ: {product.category}
            </Typography>

            {/* ボタン */}
            <Box display="flex" gap={2} mt={3}>
              <Button variant="contained" color="primary" onClick={handleAddToCart}>
                カートに追加
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                戻る
              </Button>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default ProductDetailPage;
