import React from "react"
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
import { useSelector, UseSelector, useDispatch } from "react-redux"
import { changeModalSignIn } from "@/features/user/userSlice"
import { useNavigate } from "react-router-dom"

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
import { useLoginMutation } from "@/features/api/apiSlice"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
})

const SignIn = () => {
  const isOpen = useSelector(getOpenSignIn)
  const dispatch = useDispatch()
  const { toast } = useToast()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values: ", values)
    try {
      const token = await login({
        username: values.username,
        password: values.password,
      }).unwrap()

      console.log("token: ", token)

      setTokenCookie(token.access_token)

      toast({
        variant: "success",
        title: "Your request is successful",
        description: "You are logged in !",
      })

      navigate("/dashboard")
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

  function setTokenCookie(token: String) {
    document.cookie = `access_token=${token}; path=/; SameSite=Secure`
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(changeModalSignIn())}>
      <DialogContent>
        <DialogHeader>
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Box sx={{ display: "flex" }}>
                <CircularProgress className="w-60 h-60" />
              </Box>
            </div>
          )}

          <DialogTitle className="text-center mb-5">Log in</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} disabled={isLoading}/>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} disabled={isLoading}/>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <Button type="submit" disabled={isLoading}>Submit</Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SignIn
