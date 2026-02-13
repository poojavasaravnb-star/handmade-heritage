import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <h1>✅ Order Placed Successfully!</h1>
      <p>Thank you for shopping with us 💖</p>
      <p>Your handmade product will be delivered soon.</p>

      <button onClick={() => navigate("/shop")} className="success-btn">
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
