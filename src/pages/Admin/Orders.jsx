import React, { useEffect, useState } from "react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const ORDER_API =
    "https://698823cf780e8375a6879f02.mockapi.io/orders";

  // Fetch Orders
  const getOrders = async () => {
    const res = await fetch(ORDER_API);
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  // ✅ Update Status
  const updateStatus = async (order) => {
    const newStatus =
      order.status === "Pending" ? "Delivered" : "Pending";

    await fetch(`${ORDER_API}/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...order,
        status: newStatus,
      }),
    });

    getOrders();
  };

  // ✅ Delete Order
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    await fetch(`${ORDER_API}/${id}`, {
      method: "DELETE",
    });

    getOrders();
  };

  return (
    <div className="admin-orders">
      <h2> Orders Management</h2>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Items</th>
              <th>Total ₹</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>

                <td>{order.name}</td>

                <td>{order.mobile}</td>

                <td>
                  {order.address}, {order.city} - {order.pincode}
                </td>

                <td>
                  {order.items?.map((item) => (
                    <div key={item.id}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>

                <td>{order.totalAmount}</td>

                <td>
                  <button
                    className={`status-btn ${order.status?.toLowerCase()}`}
                    onClick={() => updateStatus(order)}
                  >
                    {order.status}
                  </button>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteOrder(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    )}
    </div>
  );
};

export default Orders;
