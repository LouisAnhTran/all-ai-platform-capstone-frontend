import React from 'react'
import { SignUp } from '@clerk/clerk-react'

const SignUpPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center align-middle items-center">
    <div className="w-200">
      <SignUp />
    </div>
  </div>
  )
}

export default SignUpPage