// src/__tests__/ProductListPage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductListPage from "../pages/ProductListPage";
import { CartProviderWrapper } from "../test-utils/CartProviderWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe.skip("ProductListPage", () => {
  test("カートに追加するとトーストが表示される", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CartProviderWrapper>
          <ProductListPage searchQuery="" selectedCategory="" />
        </CartProviderWrapper>
      </QueryClientProvider>
    );

    // 商品追加ボタンが表示されるまで待つ
    const addButton = await screen.findByRole("button", { name: /カートに追加/i });

    // クリック
    userEvent.click(addButton);

    // トーストが表示されることを確認
    expect(await screen.findByText("カートに追加しました")).toBeInTheDocument();
  });
});
