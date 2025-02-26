// src/components/Login.jsx
"use client";

import { useState } from "react";
import { FaUser, FaLock, FaCoins, FaChartLine, FaPiggyBank } from "react-icons/fa";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form-container">
          <div className="login-header">
            <FaCoins className="coin-icon" />
            <h1>CoinTrack</h1>
          </div>
          <h2>{isSignup ? "Sign Up" : "Welcome Back"}</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="login-footer" style={{ color: "#ef4444" }}>{error}</p>}
            <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
          </form>

          <p className="login-footer">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(!isSignup); }}>
              {isSignup ? "Log in" : "Sign up"}
            </a>
          </p>
        </div>
      </div>

      <div className="info-content">
        <h2>Transform Your Financial Future with CoinTrack</h2>
        <p>
          CoinTrack is the ultimate financial companion for teenagers looking to take control of their money. Our
          easy-to-use platform helps you develop smart financial habits that will last a lifetime.
        </p>
        <div className="feature-list">
          <div className="feature-item">
            <FaChartLine className="feature-icon" />
            <h3>Track Your Spending</h3>
            <p>Easily log your income and expenses to see where your money is going.</p>
          </div>
          <div className="feature-item">
            <FaPiggyBank className="feature-icon" />
            <h3>Set Savings Goals</h3>
            <p>Create and track savings goals for things you want to buy or experiences you want to have.</p>
          </div>
        </div>
        <p className="cta-text">Start your journey to financial success today with CoinTrack!</p>
      </div>
    </div>
  );
}

export default Login;