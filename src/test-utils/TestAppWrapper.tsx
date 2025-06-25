import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "../contexts/CartContext";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

export const TestAppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
};
