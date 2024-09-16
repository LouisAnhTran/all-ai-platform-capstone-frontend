import { UserButton } from "@clerk/clerk-react"
import { AlignJustify, Bell, Brain, Settings } from "lucide-react"
import React from "react"
import { Link, useLocation } from "react-router-dom"

const items_menu = [
    {
        title: "Dashboard",
        link: "/dashboard",
      },
  {
    title: "Catalogue",
    link: "/catalogue",
  },
  {
    title: "Tools Management",
    link: "/tool_management",
  },
  {
    title: "Our AI tools",
    link: "/our_ai_tools",
  },
  {
    title: "AI Benchmarking",
    link: "/ai_benchmarking",
  },
]

const NavBar = () => {
  const location = useLocation()

  console.log("location: ", location.pathname)

  return (
    <div className="px-20 pt-5 w-full">
        {/* Navbar */}

      <div className="flex flex-row justify-between w-full">
        {/* logo */}
        <div className="flex flex-row items-center space-x-4">
          <Brain className="h-12 w-12 text-slate-700"></Brain>
          <p className="text-3xl font-bold text-slate-700">All AI</p>
        </div>

        {/* navigation */}
        <div className="flex flex-row tracking-normal space-x-2 items-center text-lg text-slate-600 font-semibold">
          {items_menu.map(item => (
            <Link to={item.link}>
              <p className={`hover:bg-slate-100 rounded-3xl p-3 transition-transform duration-900 ${location?.pathname == item.link && 'bg-slate-100'}`}>
                {item.title}
              </p>
            </Link>
          ))}

          <Bell></Bell>
          <Settings></Settings>
          <div className="flex flex-row items-center justify-between space-x-3 rounded-3xl border-2 p-3 hover:shadow-md">
            <AlignJustify></AlignJustify>
            <UserButton></UserButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
