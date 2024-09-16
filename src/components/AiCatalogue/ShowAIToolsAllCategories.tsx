import React from "react"

import { useGetAiToolsForAllCategoryQuery } from "@/features/api/apiSlice"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Skeleton from "@mui/material/Skeleton"
import AIToolEachCategory from "./AIToolEachCategory"
import { useSelector } from "react-redux"
import { getOnboardingFinishedState } from "@/features/onboarding/onboardingSlice"

const category_mappings=[
  {
    full: "Video editing",
    short: "video_edition"
  },
  {
    full: "Automation",
    short: "automation"
  },
  {
    full: "AI Chats",
    short: "ai_chats"
  },
  {
    full: "Video Generators",
    short: "video_generators"
  }
]

const ShowAIToolsAllCategories = () => {
  const isOnBoardingFinished=useSelector(getOnboardingFinishedState)

  return (
    <div className="w-full flex justify-center">
      <div className="w-10/12 mt-3">
      {
      isOnBoardingFinished && 
        category_mappings.map((item,index)=>(
          <AIToolEachCategory key={index} category_short={item.short} category_full={item.full}></AIToolEachCategory>
        ))
      }
      </div>
    </div>
  )
}

export default ShowAIToolsAllCategories
