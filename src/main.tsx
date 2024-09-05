import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { ClerkProvider } from "@clerk/clerk-react"

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <App />
        </ClerkProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
