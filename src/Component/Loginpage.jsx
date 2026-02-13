import React, { useState } from "react";
import "./loginpage.css";
import { useNavigate } from "react-router-dom";

const API_URL = "https://6981e61cc9a606f5d44864fa.mockapi.io/login";

const Loginpage = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!regName || !regEmail || !regPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(API_URL);
      const users = await res.json();

      if (users.some((user) => user.email === regEmail)) {
        alert("Email already registered");
        return;
      }

      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
          role: "user",
        }),
      });

      alert("Registration successful! Please login.");

      setIsLogin(true);
      setRegName("");
      setRegEmail("");
      setRegPassword("");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      alert("Please fill all fields");
      return;
    }

    // ✅ Admin hardcoded
    if (loginEmail === "admin@gmail.com" && loginPassword === "12345") {
      const admin = {
        email: "admin@gmail.com",
        role: "admin",
      };
      localStorage.setItem("admin", JSON.stringify(admin));
      alert("Welcome Admin!");
      navigate("/admin", { replace: true });
      return;
    }

    try {
      const res = await fetch(API_URL);
      const users = await res.json();

      const user = users.find(
        (u) => u.email === loginEmail && u.password === loginPassword
      );

      if (!user) {
        alert("Invalid email or password");
        return;
      }

      localStorage.setItem("logindata", JSON.stringify(user));
      alert(`Welcome, ${user.name}!`);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="slider-buttons">
        <button
          className={isLogin ? "active" : ""}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>

        <button
          className={!isLogin ? "active" : ""}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      {isLogin ? (
        <form onSubmit={handleLogin} className="auth-form">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="auth-form">
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default Loginpage;
