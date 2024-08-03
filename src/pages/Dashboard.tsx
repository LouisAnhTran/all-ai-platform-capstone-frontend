import React from "react"
import { useLocation } from "react-router-dom"
import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

import CustomFileUploader from "@/components/FileUploader"
import { useUploadFileMutation } from "@/features/api/apiSlice"
import { UseDispatch } from "react-redux"
import { useToast } from "@/components/ui/use-toast"


const Dashboard = () => {

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
