import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { getOpenSignUp } from "@/features/user/userSlice"
import { useSelector, useDispatch } from "react-redux"
import { changeModalSignUp } from "@/features/user/userSlice"
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
import { useAddUserMutation } from "@/features/api/apiSlice"
import Spinner from "./Spinner"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z
  .object({
    username: z.string().min(6, {
      message: "Username must be at least 6 characters.",
    }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  })

const SignUp = () => {
  const isOpen = useSelector(getOpenSignUp)
  const dispatch = useDispatch()
  const { toast } = useToast()
  const navigate=useNavigate();

  const [addUser, { isLoading }] = useAddUserMutation()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  console.log("isLoading: ", isLoading)

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    try {
      console.log("enter")

      const result=await addUser({
        username: values.username,
        password: values.password,
        email: values.email,
      }).unwrap()

      console.log("result: ",result)

      toast({
        variant: "success",
        title: "Your request is successful",
        description: result.message,
      })

      dispatch(changeModalSignUp())
      
    } catch (e: any) {
      console.error("Failed to save the post: ", e.data.detail)

      // Error toast
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: e.data.detail,
      })
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => dispatch(changeModalSignUp())}>
        <DialogContent>
          <DialogHeader className="relative">
            {isLoading && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Box sx={{ display: "flex" }}>
                  <CircularProgress className="w-60 h-60" />
                </Box>
              </div>
            )}

            <DialogTitle className="text-center mb-4">Sign Up</DialogTitle>
            <DialogDescription>
              {/* Form area */}
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
                          <Input
                            placeholder="ilovechatgpt"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@gmail.com"
                            {...field}
                            disabled={isLoading}
                          />
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
                          <Input
                            placeholder="@#123456PdfPro"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="@#123456PdfPro"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center">
                    <Button type="submit" disabled={isLoading}>
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SignUp
