import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { getOpenSignIn } from "@/features/user/userSlice"
import { useSelector, UseSelector, useDispatch } from "react-redux"
import { changeModalSignIn } from "@/features/user/userSlice"

const SignIn = () => {
    const isOpen=useSelector(getOpenSignIn);
const dispatch=useDispatch();

  return (
    <Dialog open={isOpen} onOpenChange={()=>dispatch(changeModalSignIn())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SignIn
