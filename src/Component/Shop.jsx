import React, { useEffect, useState } from "react";
import "./Shop.css";
import { useLocation, useNavigate } from "react-router-dom";

const PRODUCT_API = "https://6985eb3d6964f10bf254eb60.mockapi.io/product";
const CART_API = "https://6985eb3d6964f10bf254eb60.mockapi.io/cart";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");   // ✅ FIXED
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(PRODUCT_API);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= FILTER =================
  useEffect(() => {
    let result = [...products];

    if (category) {
      result = result.filter((p) =>
        p.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (searchTerm.trim() !== "") {
      result = result.filter((p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [products, category, searchTerm]);

  // ================= ADD TO CART (MockAPI) =================
  const addToCart = async (product) => {

    const user = localStorage.getItem("logindata");

    if (!user) {
      alert("Please login first");
      navigate("/login-page");
      return;
    }

    if (product.quantity <= 0) return;

    try {
      // 🔥 Get existing cart
      const cartRes = await fetch(CART_API);
      const cartData = await cartRes.json();

      const existingItem = cartData.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        // 🔼 Increase qty
        await fetch(`${CART_API}/${existingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...existingItem,
            quantity: existingItem.quantity + 1,
          }),
        });

      } else {
        // ➕ Add new item
        await fetch(CART_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          }),
        });
      }

      // 🔥 Reduce stock
      await fetch(`${PRODUCT_API}/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          quantity: product.quantity - 1,
        }),
      });

      fetchProducts();
      navigate("/cart");

    } catch (error) {
      console.log("Cart error", error);
    }
  };

  return (
    <div className="shop-container">
      <br /><br /><br />

      <h2 className="shop-title">
        {category
          ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`
          : "Our Handmade Collection"}
      </h2>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search handmade products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p className="loading-text">Loading products...</p>}

      <div className="product-grid">
        {!loading && filteredProducts.length === 0 ? (
          <p className="no-product">No products found</p>
        ) : (
          filteredProducts.map((item) => (
            <div className="product-card" key={item.id}>

              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="product-image"
                  onClick={() => navigate(`/product/${item.id}`)}
                />
              )}

              <h3
                className="product-name"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                {item.name}
              </h3>

              <p>₹{item.price}</p>

              {item.quantity > 0 ? (
                <button
                  className="add-btn"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              ) : (
                <button className="out-stock-btn" disabled>
                  Out of Stock
                </button>
              )}

              {item.quantity > 0 && item.quantity <= 5 && (
                <p className="low-stock">
                  Only {item.quantity} left!
                </p>
              )}

            </div>
          ))
        )}
      </div>
    </div>
  );
}
