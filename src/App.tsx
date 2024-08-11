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
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { Toaster } from "./components/ui/toaster"
import MySubcription from "./pages/MySubcription"
import DocChatBotHome from "./pages/DocChatBotHome"
import DocChatbot from "./pages/DocChatbot"
import UsageAnalytics from "./pages/UsageAnalytics"
import RightSidebar from "./components/RightSidebar"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Toaster></Toaster>
              <SignIn></SignIn>
              <SignUp></SignUp>
              <Homepage></Homepage>
            </>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <div className="flex">
              <Toaster></Toaster>
              <InterSidebar></InterSidebar>
              <div className="h-screen flex-1 py-7 pr-5">
                <Dashboard></Dashboard>
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/all_documents"
          element={
            <div className="flex">
              <Toaster></Toaster>
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
        <Route
          path="/subcription"
          element={
            <div className="flex">
              <InterSidebar></InterSidebar>
              <div className="h-screen flex-1 p-7">
                <MySubcription></MySubcription>
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/chat_bot"
          element={
            <div className="flex">
              <InterSidebar></InterSidebar>
              <div className="h-screen flex-1 p-2 bg-black">
                <DocChatBotHome></DocChatBotHome>
              </div>
              <RightSidebar></RightSidebar>
            </div>
          }
        ></Route>
        <Route
          path="/chat_bot/:doc_name"
          element={
            <div className="flex">
              <InterSidebar></InterSidebar>
              <div className="h-screen flex-1 p-2 bg-black">
                <DocChatbot></DocChatbot>
              </div>
              <RightSidebar></RightSidebar>
            </div>
          }
        ></Route>
        <Route
          path="/usage_analytics"
          element={
            <div className="flex">
              <InterSidebar></InterSidebar>
              <div className="h-screen flex-1 p-7">
                <UsageAnalytics></UsageAnalytics>
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </Router>
  )
}

export default App
