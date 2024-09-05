import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { ClerkProvider } from "@clerk/clerk-react"


import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const AWS_ACCESS_KEY = import.meta.env.VITE_AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

const secret_name = "all-ai-capstone";

const client = new SecretsManagerClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
});

let response;


response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    })
);

let secret=null;

if(response.SecretString) { secret = JSON.parse(response?.SecretString)};

// Import your publishable key
const PUBLISHABLE_KEY = secret.VITE_CLERK_PUBLISHABLE_KEY;


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
