"use client"

import { useState } from "react"
import { FaUser, FaLock, FaCoins, FaChartLine, FaPiggyBank } from "react-icons/fa"

function Login({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username && password) {
      onLogin()
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form-container">
          <div className="login-header">
            <FaCoins className="coin-icon" />
            <h1>CoinTrack</h1>
          </div>
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit">Log In</button>
          </form>
          <p className="login-footer">
            Don't have an account? <a href="#">Sign up</a>
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
  )
}

export default Login
