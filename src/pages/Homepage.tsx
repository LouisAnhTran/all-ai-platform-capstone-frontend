import React from "react"
import { Bot, BotIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getOpenSignIn, getOpenSignUp } from "@/features/user/userSlice"
import { useSelector, useDispatch } from "react-redux"
import { changeModalSignIn, changeModalSignUp } from "@/features/user/userSlice"
import SignIn from "@/components/SignIn"

const Homepage = () => {
  const isOpenSignUp = useSelector(getOpenSignUp)
  const isOpenSignIn = useSelector(getOpenSignIn)

  const dispatch = useDispatch()

  console.log("isOpenSignIn: ", isOpenSignIn)
  console.log("isOpenSignUp: ", isOpenSignUp)

  return (
    <>
      <div className="flex w-full">
        <div className="h-screen bg-black w-1/2 flex flex-col justify-center items-center space-y-4 overflow-hidden relative max-w-full">
          <img src="./logo.png" alt="" className="w-32 h-32 mb-10" />
          <p className="text-5xl text-white font-bold">PDFQueryPro</p>
          <p className="text-4xl text-white text-center p-5">
            Unlock PDF Insights – Every Question, Every Answer
          </p>

          <div
            className="absolute bottom-10 left-3 text-center justify-center items-center flex transition-transform duration-500 overflow-hidden space-x-4"
            style={{
              animation: "move-across 5s linear infinite",
            }}
          >
            <div className="rounded-lg bg-slate-300 w-30 h-20 flex justify-center items-center p-4 overflow-hidden">
              <p className="text-black italic">
                PDF retrieval information - powered by GenAI
              </p>
            </div>

            {/* <div className="rounded-lg bg-slate-300 w-30 h-20 flex justify-center items-center p-4 overflow-hidden">
              <p className="text-black italic">
                PDF retrieval information - powered by GenAI
              </p>
            </div>

            <div className="rounded-lg bg-slate-300 w-30 h-20 flex justify-center items-center p-4 overflow-hidden">
              <p className="text-black italic">
                PDF retrieval information - powered by GenAI
              </p>
            </div> */}
          </div>
        </div>
        <div className="h-screen w-1/2 flex flex-col justify-center items-center space-y-4">
          <BotIcon size={300}></BotIcon>
          <div className="flex flex-row justify-center space-x-4">
            <Button size={"lg"} onClick={() => dispatch(changeModalSignUp())}>
              Sign Up
            </Button>
            <Button size={"lg"} onClick={() => dispatch(changeModalSignIn())}>
              Log In
            </Button>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes move-across {
            from { left: 0; }
            to { left: 100%; }
          }
        `}
      </style>
    </>
  )
}

export default Homepage
