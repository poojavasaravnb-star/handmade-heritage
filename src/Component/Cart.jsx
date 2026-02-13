import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const API_URL = "https://6985eb3d6964f10bf254eb60.mockapi.io/cart";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // 📦 Fetch Cart Items
  const fetchCart = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCartItems(data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ➕ Increase Quantity
  const incrementQty = async (item) => {
    try {
      const updatedItem = {
        ...item,
        quantity: item.quantity + 1,
      };

      await fetch(`${API_URL}/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // ➖ Decrease Quantity
  const decrementQty = async (item) => {
    try {
      if (item.quantity === 1) {
        removeFromCart(item.id);
        return;
      }

      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
      };

      await fetch(`${API_URL}/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ Remove Item
  const removeFromCart = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // 💰 Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: ₹{item.price * item.quantity}</p>
                </div>

                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => decrementQty(item)}
                  >
                    −
                  </button>

                  <button
                    className="qty-btn"
                    onClick={() => incrementQty(item)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
