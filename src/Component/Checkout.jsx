import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./Checkout.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    mobile: "",
  });

  const CART_API = "https://6985eb3d6964f10bf254eb60.mockapi.io/cart";
  const PRODUCT_API = "https://6985eb3d6964f10bf254eb60.mockapi.io/product";
  const ORDER_API = "https://698823cf780e8375a6879f02.mockapi.io/orders";

  // Fetch Cart
  const getCart = async () => {
    const res = await fetch(CART_API);
    const data = await res.json();
    setCartItems(data);

    const totalPrice = data.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setTotal(totalPrice);
  };

  useEffect(() => {
    getCart();
  }, []);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pincode" || name === "mobile") {
      setFormData({
        ...formData,
        [name]: value.replace(/\D/g, ""),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // 🔥 Generate PDF Bill
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Order Bill", 80, 10);

    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 10, 20);
    doc.text(`Address: ${formData.address}`, 10, 27);
    doc.text(`City: ${formData.city}`, 10, 34);
    doc.text(`Pincode: ${formData.pincode}`, 10, 41);
    doc.text(`Mobile: ${formData.mobile}`, 10, 48);

    doc.text("Items:", 10, 60);

    let y = 70;

    cartItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} (x${item.quantity}) - ₹${
          item.price * item.quantity
        }`,
        10,
        y,
      );
      y += 10;
    });

    doc.text(`Total Amount: ₹${total}`, 10, y + 10);

    doc.save("bill.pdf");
  };

  // Place Order
  const placeOrder = async () => {
    const { name, address, city, pincode, mobile } = formData;

    if (!name || !address || !city || !pincode || !mobile) {
      alert("Fill all fields");
      return;
    }

    // Update Product Stock
    const productRes = await fetch(PRODUCT_API);
    const products = await productRes.json();

    for (let cartItem of cartItems) {
      const product = products.find((p) => p.id === cartItem.id);

      if (product) {
        await fetch(`${PRODUCT_API}/${product.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...product,
            quantity: product.quantity - cartItem.quantity,
          }),
        });
      }
    }

    // Save Order
    const newOrder = {
      name,
      address,
      city,
      pincode,
      mobile,
      items: cartItems,
      totalAmount: total,
      status: "Pending",
      date: new Date().toLocaleString(),
    };

    await fetch(ORDER_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });

    // 🔥 Generate Bill after order
    generatePDF();

    // Clear Cart
    for (let item of cartItems) {
      await fetch(`${CART_API}/${item.id}`, {
        method: "DELETE",
      });
    }

    navigate("/order-success");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-box">
        <h3>Order Summary</h3>

        {cartItems.map((item) => (
          <div key={item.id} className="summary-item">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <h3>Total: ₹{total}</h3>
      </div>

      <div className="checkout-box">
        <h3>Shipping Details</h3>

        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          maxLength={6}
        />
        <input
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
          maxLength={10}
        />

        <button className="place-order-btn" onClick={placeOrder}>
          Place Order & Download Bill
        </button>
      </div>
    </div>
  );
};

export default Checkout;
