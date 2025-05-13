import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./Project-1/Header";
import ProductList from "./Project-1/ProductList";
import { Routes, Route } from "react-router-dom";
import ProductDetailsPage from "./Project-1/ProductDetailsPage";
import ShoppingCart from "./Project-1/ShoppingCart";
import { SearchProvider } from "./SearchContext";

function App() {
  return (
    <>
      
      {/* <ProductList/> */}

      <SearchProvider>
      <Header />
        <Routes>
          <Route path="products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
        </Routes>
      </SearchProvider>
    </>
  );
}

export default App;
