import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import FinanceTracker from "./components/FinanceTracker"

const rootElement = document.getElementById("root")

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  const errorElement = document.createElement("div")
  errorElement.id = "error-message"
  errorElement.textContent = "Unable to find root element. Please check your HTML file."
  document.body.appendChild(errorElement)
  console.error("Failed to find the root element")
}

