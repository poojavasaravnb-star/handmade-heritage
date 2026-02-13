import React, { useEffect, useState } from "react";
import "./admindashboard.css";
import {
  LineChart,
  PieChart,
  Pie,
  Cell,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ✅ API LINKS
const PRODUCT_API = "https://6985eb3d6964f10bf254eb60.mockapi.io/product";
const ORDER_API = "https://698823cf780e8375a6879f02.mockapi.io/orders";
const USER_API = "https://6981e61cc9a606f5d44864fa.mockapi.io/login";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch(PRODUCT_API);
        const orderRes = await fetch(ORDER_API);
        const userRes = await fetch(USER_API);

        const productData = await productRes.json();
        const orderData = await orderRes.json();
        const userData = await userRes.json();

        setProducts(productData);
        setOrders(orderData);

        // ✅ Users Filter (optional role check)
        const normalUsers = userData.filter(
          (user) => user.role === "user" || !user.role,
        );
        setUsers(normalUsers);

        // ✅ SAFE TOTAL REVENUE (ONLY FROM ORDERS API)
        const revenue = orderData.reduce((sum, order) => {
          const amount = Number(order.totalAmount);
          return sum + (isNaN(amount) ? 0 : amount);
        }, 0);

        setTotalRevenue(revenue);

        // ✅ Low Stock (1–5)
        const lowStock = productData.filter(
          (p) => Number(p.quantity) > 0 && Number(p.quantity) <= 5,
        );
        setLowStockProducts(lowStock);

        // ✅ Out Of Stock (0)
        const outStock = productData.filter((p) => Number(p.quantity) === 0);
        setOutOfStockProducts(outStock);

        setLoading(false);
      } catch (error) {
        console.error("Dashboard API Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 📊 LINE CHART DATA
  const lineData = [
    { name: "Products", value: products.length },
    { name: "Orders", value: orders.length },
    { name: "Users", value: users.length },
  ];

  // 🥧 PIE CHART DATA
  const pieData = [
    {
      name: "In Stock",
      value:
        products.length - lowStockProducts.length - outOfStockProducts.length,
    },
    { name: "Low Stock", value: lowStockProducts.length },
    { name: "Out of Stock", value: outOfStockProducts.length },
  ];

  const COLORS = ["#6366f1", "#f59e0b", "#ef4444"];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f5f0]">
      <br />
      <div className="p-8">
        <h3 className="text-3xl font-bold text-gray-800">Hello Admin 👑</h3>
        <p className="text-gray-600 mt-1">
          Manage your Handmade Heritage Craft store
        </p>

        {/* 🔥 TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-gray-500 text-sm">Total Products</h3>
            <p className="text-2xl font-bold text-amber-600 mt-1">
              {products.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-gray-500 text-sm">Total Orders</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {orders.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-gray-500 text-sm">Users</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {users.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-gray-500 text-sm">Total Revenue</h3>
            <p className="text-xl font-bold text-purple-600 mt-1">
              ₹{totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* 📊 CHARTS */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* LINE CHART */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Store Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* PIE CHART */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Stock Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
