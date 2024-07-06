import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { getOpenSignUp } from "@/features/user/userSlice"
import { useSelector, useDispatch } from "react-redux"
import { changeModalSignUp } from "@/features/user/userSlice"

const SignUp = () => {
  const isOpen = useSelector(getOpenSignUp)
  const dispatch = useDispatch()

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(changeModalSignUp())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Sign Up</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SignUp
