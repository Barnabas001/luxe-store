import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";
import Navbar from "./components/layout/Navbar";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div
                style={{
                  color: "var(--gold)",
                  padding: "4rem",
                  fontFamily: "Cormorant Garamond",
                }}
              >
                Home coming soon...
              </div>
            }
          />
          <Route
            path="/shop"
            element={
              <div style={{ color: "var(--gold)", padding: "4rem" }}>
                Shop coming soon...
              </div>
            }
          />
          <Route
            path="/cart"
            element={
              <div style={{ color: "var(--gold)", padding: "4rem" }}>
                Cart coming soon...
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
