import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

const PRODUCT_API = "https://6985eb3d6964f10bf254eb60.mockapi.io/product";
const LOGIN_API = "https://6981e61cc9a606f5d44864fa.mockapi.io/login";
const CART_API = "https://6985eb3d6964f10bf254eb60.mockapi.io/cart";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH PRODUCT =================
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${PRODUCT_API}/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.log("Product fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ================= CHECK LOGIN =================
  const checkUserLogin = async () => {
    const storedUser = JSON.parse(localStorage.getItem("logindata"));

    if (!storedUser) return null;

    try {
      const res = await fetch(LOGIN_API);
      const users = await res.json();

      return users.find((u) => u.email === storedUser.email);
    } catch (error) {
      console.log("Login check error", error);
      return null;
    }
  };

  // ================= ADD TO CART (MockAPI) =================
  const addToCart = async () => {
    const user = await checkUserLogin();

    if (!user) {
      alert("Please login first");
      navigate("/login-page");
      return;
    }

    if (!product || product.quantity <= 0) return;

    try {
      // ✅ Get existing cart items
      const cartRes = await fetch(CART_API);
      const cartData = await cartRes.json();

      const existingItem = cartData.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        // 🔼 Increase quantity
        await fetch(`${CART_API}/${existingItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...existingItem,
            quantity: existingItem.quantity + 1,
          }),
        });

      } else {
        // ➕ Add new cart item
        await fetch(CART_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          }),
        });
      }

      // 🔥 Reduce stock in product API
      await fetch(`${PRODUCT_API}/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          quantity: product.quantity - 1,
        }),
      });

      fetchProduct();
      navigate("/cart");

    } catch (error) {
      console.log("Cart error", error);
    }
  };

  // ================= UI =================
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading product...</h2>;
  }

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  return (
    <div className="product-details-container">
      <br />
      <br />

      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <div className="product-details-card">
        <img
          src={product.image}
          alt={product.name}
          className="details-image"
        />

        <div className="details-info">
          <h2>{product.name}</h2>

          <p className="price">₹{product.price}</p>

          <p>Category: {product.category}</p>

          <p style={{ color: product.quantity > 0 ? "green" : "red" }}>
            {product.quantity > 0
              ? `In Stock (${product.quantity})`
              : "Out of Stock"}
          </p>

          <p>
            {product.description || "Beautiful handmade heritage craft"}
          </p>

          {product.quantity > 0 ? (
            <button className="add-btn" onClick={addToCart}>
              Add to Cart
            </button>
          ) : (
            <button className="out-stock-btn" disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
