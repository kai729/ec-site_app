// src/hooks/useCartTotal.ts
import { useMemo } from "react";
import { useCart } from "../contexts/CartContext";

export const useCartTotal = () => {
  const { state } = useCart();

  const totalItems = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  return totalItems;
};
