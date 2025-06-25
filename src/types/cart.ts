import type { Product } from "./Product";

export type CartItem = Product & { quantity: number };

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number } // idのみ
  | { type: "INCREMENT_QUANTITY"; payload: number }
  | { type: "DECREMENT_QUANTITY"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }; // 追加
