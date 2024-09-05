import React from "react"
import { Bot, BotIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getOpenSignIn, getOpenSignUp } from "@/features/user/userSlice"
import { useSelector, useDispatch } from "react-redux"
import { changeModalSignIn, changeModalSignUp } from "@/features/user/userSlice"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignUp
} from "@clerk/clerk-react"

import Typewriter from "typewriter-effect"
import { useNavigate } from "react-router-dom"

const Homepage = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex w-full">
        <div className="h-screen bg-[#080833] w-[65%] flex flex-col justify-center items-center space-y-4 overflow-hidden relative max-w-full">
          <p className="text-5xl text-[#9a4de1] font-bold">AllAI Platform - Ultimate AI Solutions</p>
          <p className="text-4xl text-[#9a4de1] text-center p-5">
            <Typewriter
              options={{
                strings: [
                  "  Find the Right AI Tool for Every Use Case",
                  "We provide the ultimate source for AI Tools for your unique use case !",
                  "Find, Compare, and Choose the Best AI Tools"
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </p>
        </div>

        <div className="h-screen flex-1 flex flex-col justify-center bg-[#080808] items-center space-y-4">
          <BotIcon size={300} className="text-[#7d23cf]"></BotIcon>
          <div className="flex flex-row justify-center space-x-4">
            <Button
              className="bg-[#2013d0] hover:bg-[#2013d0] hover:scale-105 transform transition duration-300"
              size={"lg"}
              onClick={() => navigate('/sign-up')}
            >
              Sign Up
            </Button>
            <Button
              className="bg-[#2013d0] hover:bg-[#2013d0] hover:scale-105 transform transition duration-300"
              size={"lg"}
              onClick={() => navigate('/sign-in')}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage
