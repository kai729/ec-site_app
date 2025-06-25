// src/__tests__/CartPage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartPage from "../pages/CartPage";
import { CartProviderWrapper } from "../test-utils/CartProviderWrapper";
import { MemoryRouter } from "react-router-dom";

describe.skip("CartPage", () => {
  test("カートに追加するとトーストが表示される", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CartProviderWrapper>
          <ProductListPage searchQuery="" selectedCategory="" />
        </CartProviderWrapper>
      </QueryClientProvider>
    );

    // 🔥 ここを追加（Skeletonが消えるまで待つ）
    await waitForElementToBeRemoved(() => screen.queryAllByTestId("skeleton"));

    // ✅ Skeleton消えた後にボタンを探す
    const addButton = await screen.findByRole("button", { name: /カートに追加/i });

    // クリック
    userEvent.click(addButton);

    // トースト表示の検証
    expect(await screen.findByText(/カートに追加しました/i)).toBeInTheDocument();
  });
});
