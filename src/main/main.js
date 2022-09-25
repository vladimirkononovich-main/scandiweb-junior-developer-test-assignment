import React from "react";
import "./main.css";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "./categoryPage/categoryPage";
import ProductPage from "./productPage/productPage";
import CartPage from "./cartPage/cartPage";

class Main extends React.Component {
  render() {
    return (
      <>
        <main className="main">
          <Routes>
            <Route path="/categories/:categoryId" element={<CategoryPage />} />
            <Route
              path="/categories/:categoryId/:productId"
              element={<ProductPage />}
            />
            <Route
              path="/categories/:categoryId/cartPage"
              element={<CartPage />}
            />
          </Routes>
        </main>
      </>
    );
  }
}

export default Main;
