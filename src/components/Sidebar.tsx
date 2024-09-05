import React from "react"
import { useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import {
  SignOutButton
} from '@clerk/clerk-react'

const Menus = [
  { title: "Dashboard", src: "Chart_fill", link: "/dashboard" },
  { title: "Chat Bot", src: "Search", link: "/chat_bot" },
  { title: "Documents Management", src: "Chat", link: "/all_documents" },
  { title: "My Account", src: "User", gap: true, link: "/myaccount" },
  { title: "Subscription Management", src: "Setting", link: "/subcription" },
  { title: "Usage Analytics", src: "Chart", link: "/usage_analytics" }
]

const InterSidebar = () => {
  const [open, setOpen] = useState(true)
  const currenRoute = useLocation();
  
  const route=currenRoute.pathname;

  return (
    <div>
      <SignOutButton></SignOutButton>
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-blacksidebar h-screen p-5  pt-8 relative duration-500 flex flex-col border-r`}
      >
        <img
          src="./control.png"
          alt="okie"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                  border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            alt="okie"
            src="./logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-slate-300 origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            PDFQueryPro
          </h1>
        </div>

        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={Menu.link}>
              <li
                key={index}
                className={`group flex rounded-md p-2 cursor-pointer hover:bg-slate-300 hover:text-black hover:font-medium text-slate-300 text-sm items-center gap-x-4 ${route === Menu.link && 'bg-slate-300 font-medium text-black '}
                     ${Menu.gap ? " mt-2" : " mt-2"} ${
                       index === 0 && "bg-light-white"
                     } `}
              >
                <img
                  alt="okie"
                  src={`./${Menu.src}.png`}
                  className={`bg-black group-hover:scale-110 duration-500 ${route === Menu.link && 'scale-110'}`}
                />
                <span
                  className={`${!open && "hidden"} origin-left duration-300 ${route === Menu.link && 'text-black'} `}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default InterSidebar
