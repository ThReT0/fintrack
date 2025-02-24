// Import the React library to use its features
import React from "react"

// Import createRoot from ReactDOM to render the app
import { createRoot } from "react-dom/client"

// Import the CSS file to apply styles
import "./index.css"

// Import the main component of the app
import App from "./App"

// Find the element with the ID "root" in the HTML file
// If it doesn't exist, create a new div element
const rootElement = document.getElementById("root") || document.createElement("div")

// If a new div was created, assign it an ID of "root" and add it to the page
if (!rootElement.id) {
  rootElement.id = "root"
  document.body.appendChild(rootElement)
}

// Create a root for React to manage the application inside "rootElement"
const root = createRoot(rootElement)

// Render the App component inside the root, wrapped in React.StrictMode for debugging benefits
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
