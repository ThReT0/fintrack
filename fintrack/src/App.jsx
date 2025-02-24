"use client"

import "./App.css"
import { useState } from "react"
import FinanceTracker from "./components/FinanceTracker"
import Login from "./components/Login"

function App() {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Function to update state when the user logs in
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  // Display FinanceTracker if logged in; otherwise, show Login
  return <div className="App">{isLoggedIn ? <FinanceTracker /> : <Login onLogin={handleLogin} />}</div>
}

export default App
