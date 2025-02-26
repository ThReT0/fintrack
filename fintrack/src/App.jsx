// src/App.js
"use client"

import "./App.css"
import { useState, useEffect } from "react"
import FinanceTracker from "./components/FinanceTracker"
import Login from "./components/Login"
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="App">
      {isLoggedIn ? <FinanceTracker /> : <Login />}
    </div>
  )
}

export default App