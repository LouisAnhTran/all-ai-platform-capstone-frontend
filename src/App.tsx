import "./App.css"
import { Counter } from "./features/counter/Counter"
import { Quotes } from "./features/quotes/Quotes"
import logo from "./logo.svg"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"

import Homepage from "./pages/Homepage"
import Dashboard from "./pages/Dashboard"
import Documents from "./pages/Documents"
import MyAccount from "./pages/MyAccount"
import InterSidebar from "./components/Sidebar"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route
          path="/dashboard"
          element={
            <div className="flex">
              <InterSidebar></InterSidebar>
              <div className="h-screen flex-1 p-7">
                <Dashboard></Dashboard>
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/all_documents"
          element={
            <div className="flex">
              <InterSidebar></InterSidebar>
              <div className="h-screen flex-1 p-7">
                <Documents></Documents>
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/myaccount"
          element={
            <div className="flex">
              <InterSidebar></InterSidebar>
              <div className="h-screen flex-1 p-7">
                <MyAccount></MyAccount>
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </Router>
  )
}

export default App
