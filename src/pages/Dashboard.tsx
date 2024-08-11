import React from "react"
import { useLocation } from "react-router-dom"
import { styled } from "@mui/material/styles"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

import CustomFileUploader from "@/components/FileUploader"
import { useUploadFileMutation } from "@/features/api/apiSlice"
import { UseDispatch } from "react-redux"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { Slider } from "@/components/ui/slider"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import CategorySelection from "@/components/CategorySelection"

import { Checkbox } from "@/components/ui/checkbox"
import PDFDisplay from "@/components/PDFDisplay"

function valuetext(value: number) {
  return `${value} pages`
}

const labels = [
  "Science",
  "Programming",
  "Art",
  "Biography",
  "Books",
  "Technology",
  "Cryptography",
]

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-row">
      <div className="flex-1 h-full w-full">
        <PDFDisplay></PDFDisplay>
      </div>
      <div className="w-[25%] p-5 border-2 h-[72%] rounded-2xl flex flex-col bg-slate-100">
        <Input placeholder="Document name" className=""></Input>
        <Button variant="default" className="mt-3">
          Search
        </Button>
        <div className="pt-3 flex flex-col">
          <p className="font-medium">Page range</p>
          <Box sx={{ width: 350 }}>
            <Slider
              defaultValue={50}
              aria-label="default"
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={1000}
              color="primary"
            />
          </Box>
        </div>

        <div className="pt-3 flex flex-col">
          <p className="font-medium">Document size (KB)</p>
          <Box sx={{ width: 350 }}>
            <Slider
              defaultValue={50}
              aria-label="default"
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={1000}
              color="primary"
            />
          </Box>
        </div>

        <div className="pt-3 flex flex-col space-y-2">
          <p className="font-medium">Catagory Selection</p>
          <CategorySelection></CategorySelection>
        </div>

        <div className="pt-3 flex flex-col space-y-2">
          <p className="font-medium">Your preferences</p>

          {labels.map(item => (
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item}
                </label>
              </div>
            </div>
          ))}

          <Button variant="default" className="mt-10">
            Filter
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
