import type { Product } from "./Product";

// CartItem は quantity を持つ Product
export type CartItem = Product & { quantity: number };

// カートの状態
export type CartState = {
  items: CartItem[];
};

// CartAction の payload を CartItem に修正
export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem } // ここを CartItem に！
  | { type: "REMOVE_ITEM"; payload: number } // id
  | { type: "INCREMENT_QUANTITY"; payload: number }
  | { type: "DECREMENT_QUANTITY"; payload: number }
  | { type: "CLEAR_CART" };
