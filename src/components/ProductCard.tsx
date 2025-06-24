import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../types/Product";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "contain", p: 2 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ¥{product.price.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
