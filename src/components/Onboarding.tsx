import { React, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { getOpenSignIn } from "@/features/user/userSlice"
import { useSelector, useDispatch } from "react-redux"
import { changeModalSignIn } from "@/features/user/userSlice"
import { useNavigate } from "react-router-dom"
import ReactLoading from "react-loading"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  useLoginMutation,
  useOnboardNewUserMutation,
} from "@/features/api/apiSlice"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import {
  getOnboardingState,
  updateOnboadingState,
} from "@/features/onboarding/onboardingSlice"
import { useUser } from "@clerk/clerk-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  username: z.string(),
  email_address: z.string(),
})

const select_options = [
  {
    value: "Marketing",
    title: "Marketing",
  },
  {
    value: "Graphic Design",
    title: "Graphic Design",
  },
  {
    value: "Information Technology",
    title: "Information Technology",
  },
]

const Onboarding = () => {
  const isOnboarded = useSelector(getOnboardingState)
  const dispatch = useDispatch()
  const { toast } = useToast()
  const user = useUser()
  const [selectedTheme, setSelectedTheme] = useState("")

  const handleValueChange = (value: any) => {
    setSelectedTheme(value)
  }

  const [onboard, { isLoading }] = useOnboardNewUserMutation()

  console.log("isOnboarded: ", isOnboarded)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  const handleSubmit = async () => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values: ")
    console.log("Selected theme:", selectedTheme)

    try {
      const result = await onboard({
        username: user?.user?.fullName,
        email_address: user?.user?.primaryEmailAddress?.emailAddress,
        industry: selectedTheme,
      }).unwrap()

      console.log("result: ", result)

      dispatch(updateOnboadingState(true))

      toast({
        variant: "success",
        title: "Your request is successful",
        description: "You are onboarded !",
      })
    } catch (error: any) {
      console.log("error: ", error)

      // Error toast
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.data.detail,
      })
    }
  }

  return (
    <Dialog open={!isOnboarded}>
      <DialogContent>
        <DialogHeader>
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* <Box sx={{ display: "flex" }}>
                <CircularProgress className="w-60 h-60" />
              </Box> */}
              <ReactLoading
                type={"spinningBubbles"}
                color={"#ec7063"}
                height={40}
                width={70}
              />
            </div>
          )}

          <DialogTitle className="text-center mb-5 text-slate-700">
            Onboarding
          </DialogTitle>
          <DialogDescription className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-2">
              <p className="text-slate-600 font-semibold">Username</p>
              <p className="rounded-lg p-2 border-2 shadow-sm">
                {user?.user?.fullName}
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-slate-600 font-semibold">Email address</p>
              <p className="rounded-lg p-2 border-2 shadow-sm">
                {user?.user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-slate-600 font-semibold">Industry</p>
              <Select onValueChange={handleValueChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Marketing" />
                </SelectTrigger>
                <SelectContent>
                  {select_options.map(item => (
                    <SelectItem className="text-slate-600" value={item.value}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
                Submit
              </Button>
            </div>

            {/* </form>
            </Form> */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Onboarding
