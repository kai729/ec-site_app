import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductListPage from "../pages/ProductListPage";
import { TestAppWrapper } from "../test-utils/TestAppWrapper";
import { rest } from "msw";
import { setupServer } from "msw/node";

// モックデータ
const mockProducts = [
  { id: 1, title: "テスト商品A", price: 1000, image: "https://via.placeholder.com/150", category: "test" },
];

// APIモックサーバー
const server = setupServer(
  rest.get("https://fakestoreapi.com/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts));
  })
);

// テスト前後のAPIハンドラ設定
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe.skip("ProductListPage", () => {
  test("商品をカートに追加できる", async () => {
    render(<ProductListPage />, { wrapper: TestAppWrapper });

    // 商品が表示されるまで待つ
    expect(await screen.findByText("テスト商品A")).toBeInTheDocument();

    // カートに追加ボタンをクリック
    const addButton = screen.getByRole("button", { name: "カートに追加" });
    await userEvent.click(addButton);

    // トースト通知が表示される
    expect(await screen.findByText("カートに追加しました")).toBeInTheDocument();
  });
});
