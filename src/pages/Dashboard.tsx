import { UserButton, UserProfile, useUser } from "@clerk/clerk-react"
import {
  AlignJustify,
  Bot,
  Brain,
  Briefcase,
  BriefcaseBusiness,
  DatabaseZap,
  FileVideo,
  FileVideo2,
  Search,
  Settings,
  ShoppingCart,
  SquareKanban,
  Workflow,
} from "lucide-react"
import React, { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { Link } from "react-router-dom"
import ReactLoading from "react-loading"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useGetUserOnboardingStatusQuery } from "@/features/api/apiSlice"
import { useDispatch } from "react-redux"
import { updateOnboadingState } from "@/features/onboarding/onboardingSlice"

const items_menu = [
  {
    title: "Catalogue",
    link: "/catalogue",
  },
  {
    title: "Tools Management",
    link: "/tool_management",
  },
  {
    title: "Our AI tools",
    link: "/our_ai_tools",
  },
  {
    title: "AI Benchmarking",
    link: "/ai_benchmarking",
  },
]

const ai_categories = [
  {
    name: "Video Edition",
    icon: FileVideo,
  },
  {
    name: "Video Generators",
    icon: FileVideo2,
  },
  {
    name: "AI Chats",
    icon: Bot,
  },
  {
    name: "Video Edition",
    icon: FileVideo,
  },
  {
    name: "Productivity",
    icon: SquareKanban,
  },
  {
    name: "Automation",
    icon: Workflow,
  },
  {
    name: "Data Analytics",
    icon: DatabaseZap,
  },
  {
    name: "Business",
    icon: BriefcaseBusiness,
  },
  {
    name: "E-Commerse",
    icon: ShoppingCart,
  },
  {
    name: "Video Edition",
    icon: FileVideo,
  },
  {
    name: "Video Generators",
    icon: FileVideo2,
  },
  {
    name: "AI Chats",
    icon: Bot,
  },
  {
    name: "Video Edition",
    icon: FileVideo,
  },
  {
    name: "Productivity",
    icon: SquareKanban,
  },
  {
    name: "Automation",
    icon: Workflow,
  },
  {
    name: "Data Analytics",
    icon: DatabaseZap,
  },
  {
    name: "Business",
    icon: BriefcaseBusiness,
  },
  {
    name: "E-Commerse",
    icon: ShoppingCart,
  },
]

const Dashboard = () => {
  const user = useUser()
  const dispatch=useDispatch();

  const email_address = user.user?.primaryEmailAddress?.emailAddress

  // console.log("email: ", email_address)

  const { data:status, isLoading, isFetching, isError } =
    useGetUserOnboardingStatusQuery(email_address)

  // console.log("data: ", status)


  useEffect(()=>{
    if(status){
      dispatch(updateOnboadingState(status.status))
    }
  },[status,dispatch])

  if (isLoading || isFetching) {
    return (
      <div className="h-full w-full flex flex-col flex-1 align-middle items-center justify-center space-y-3">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#ec7063"}
          height={40}
          width={70}
        />
        <p className="text-slate-500 pt-10">Loading dashboard...</p>
      </div>
    )
  }

 

  return (
    <div className="w-full">
      {/* Header  */}
      <div className="px-20 pt-5 w-full">
        <div className="flex flex-row justify-between w-full">
          {/* logo */}
          <div className="flex flex-row items-center space-x-4">
            <Brain className="h-12 w-12 text-slate-700"></Brain>
            <p className="text-3xl font-bold text-slate-700">All AI</p>
          </div>

          {/* navigation */}
          <div className="flex flex-row tracking-normal space-x-2 items-center text-lg text-slate-600 font-semibold">
            {items_menu.map(item => (
              <Link to={item.link}>
                <p className="hover:bg-slate-100 rounded-3xl p-3 transition-transform duration-900">
                  {item.title}
                </p>
              </Link>
            ))}

            <Bell></Bell>
            <Settings></Settings>
            <div className="flex flex-row items-center justify-between space-x-3 rounded-3xl border-2 p-3 hover:shadow-md">
              <AlignJustify></AlignJustify>
              <UserButton></UserButton>
            </div>
          </div>
        </div>
      </div>

      {/* toggle between two types */}
      <div className="w-full flex flex-row items justify-center mt-5">
        <div className="flex flex-row space-x-4 items-center text-xl font-semibold text-slate-600">
          <p>AI Tools</p>
          <p>LLMs</p>
        </div>
      </div>

      {/* smart search engine */}
      <div className="w-full flex flex-col justify-center items-center mt-4 pb-10 border-b-2 shadow-sm">
        {/* contain input and search icon */}
        <div className="border-2 rounded-full flex flex-row w-6/12 pl-5 h-18 shadow-lg py-3 pr-2">
          {/* input  */}
          <div className="w-11/12 flex items-center justify-center">
            <input
              type="text"
              placeholder="enter your usecase"
              className="w-full border-2 border-none p-2 rounded-lg focus:outline-none focus:border-gray-300 focus:shadow-none hover:border-gray-300 hover:shadow-none"
            />
          </div>

          <div className="flex-1 flex justify-center items-center">
            <Search className="rounded-full bg-red-500 w-12 h-12 p-3 border-none text-white cursor-pointer"></Search>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full flex justify-center items-center">
        <div className="w-10/12 py-3">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {ai_categories.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/12 lg:basis-1/10"
                >
                  <div>
                    <Card className="border hover:bg-slate-100 transition-all duration-800">
                      <CardContent className="flex flex-col aspect-square items-center p-2 border-none cursor-pointer group">
                        <div className="flex flex-1 align-middle items-center pt-4">
                          <item.icon className="h-8 w-8 text-slate-500 group-hover:text-slate-900 transition-all duration-800"></item.icon>
                        </div>

                        <div className="h-4/6 text-center flex flex-col justify-center items-center">
                          <span className="text-sm font-semibold text-slate-500 text-center flex items-start group-hover:text-slate-900 group-hover:font-semibold transition-all duration-800">
                            {item.name}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
