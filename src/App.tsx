import { Box, Container, CssBaseline, createTheme, ThemeProvider, Typography, Toolbar } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import ThanksPage from "./pages/ThanksPage";
import { useState, useMemo } from "react";
import { lightTheme, darkTheme } from "./theme";

const App = () => {
  // ダークモード用
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  // 🔍 検索・カテゴリ用
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <CssBaseline />
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode((prev) => !prev)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Toolbar />

        <Box component="main" sx={{ py: 4 }}>
          <Container>
            <Routes>
              <Route
                path="/"
                element={
                  <ProductListPage
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                }
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/thanks" element={<ThanksPage />} />
            </Routes>
          </Container>
        </Box>

        <Box component="footer" sx={{ bgcolor: "#f5f5f5", py: 2, textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            &copy; {new Date().getFullYear()} ECアプリ
          </Typography>
        </Box>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
