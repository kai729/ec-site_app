// src/components/Header.tsx
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, TextField, Select, MenuItem } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCartTotal } from "../hooks/useCartTotal";
import ThemeToggleButton from "./ThemeToggleButton";

type Props = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const Header = ({
  isDarkMode,
  toggleDarkMode,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  const totalItems = useCartTotal();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* 左：ロゴ */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "secondary.main",
              fontFamily: `"Playfair Display", serif`,
              fontWeight: 700,
              fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.08)",
              "&:hover": { opacity: 0.7 },
            }}
          >
            EC-SITE_app
          </Typography>
        </Box>

        {/* 中央：検索＆カテゴリ */}
        <Box sx={{ flex: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
          <TextField
            size="small"
            label="検索"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: 1, width: 200 }}
          />
          <Select
            size="small"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            sx={{ backgroundColor: "white", borderRadius: 1, minWidth: 140 }}
          >
            <MenuItem value="">すべて</MenuItem>
            <MenuItem value="men's clothing">メンズ</MenuItem>
            <MenuItem value="women's clothing">レディース</MenuItem>
            <MenuItem value="jewelery">ジュエリー</MenuItem>
            <MenuItem value="electronics">家電</MenuItem>
          </Select>
        </Box>

        {/* 右：ダークモード＆カート */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }}>
          <ThemeToggleButton isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <IconButton component={Link} to="/cart" color="inherit" aria-label="カートを見る">
            <Badge badgeContent={totalItems} color="secondary" showZero>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
