"use client"

import "./App.css"
import { useState } from "react"
import FinanceTracker from "./components/FinanceTracker"
import Login from "./components/Login"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return <div className="App">{isLoggedIn ? <FinanceTracker /> : <Login onLogin={handleLogin} />}</div>
}

export default App

