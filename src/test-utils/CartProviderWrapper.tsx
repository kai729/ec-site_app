// src/test-utils/CartProviderWrapper.tsx
import React from "react";
import { ReactNode } from "react";
import { CartProvider } from "../contexts/CartContext";

export const CartProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};
