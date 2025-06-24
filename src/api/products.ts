// src/api/products.ts
import axios from "axios";
import type { Product } from "../types/Product";

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("商品データの取得に失敗しました");
  }
  return res.json();
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;
};
