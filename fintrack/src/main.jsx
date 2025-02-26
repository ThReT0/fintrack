// src/main.jsx
import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css" // Ensure this matches your CSS file
import App from "./App"

const rootElement = document.getElementById("root") || document.createElement("div")

if (!rootElement.id) {
  rootElement.id = "root"
  document.body.appendChild(rootElement)
}

const root = createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)