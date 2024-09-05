import React from "react"
import { SignIn } from "@clerk/clerk-react"

const SignInPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center align-middle items-center">
      <div className="w-200">
        <SignIn afterSignInUrl='/dashboard'/>
      </div>
    </div>
  )
}

export default SignInPage
