import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "./extentsion/file-uploader"
import { useState } from "react"
import type { DropzoneOptions } from "react-dropzone"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

import { Button } from "./ui/button"
import { useUploadFileMutation } from "@/features/api/apiSlice"
import { useToast } from "@/components/ui/use-toast"
import { useFetchMessagesQuery } from "@/features/api/apiSlice"

const dropZoneConfig: DropzoneOptions = {
  accept: {
    "application/pdf": [".pdf"],
  },
  multiple: false,
}

interface CustomFileUploaderProps {
  isLoadingGet: boolean; // Assuming isLoadingGet is a boolean, adjust type as needed
}

const CustomFileUploader: React.FC<CustomFileUploaderProps> = ({ isLoadingGet }) => {
  const [files, setFiles] = useState<File[]>([])
  const [uploadFile, { isLoading }] = useUploadFileMutation()
  const { toast } = useToast()

  console.log("files: ", files)

  const handleFileChange = (newFiles: File[] | null) => {
    if (newFiles) {
      console.log("upload file")
      setFiles(newFiles)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log("enter handle submit")
    if (files.length > 0) {
      const formData = new FormData()
      formData.append("file", files[0])
      try {
        const result: any = await uploadFile(formData).unwrap()

        console.log("result: ", result)

        toast({
          variant: "success",
          title: "Your request is successful",
          description: result.message,
        })

        setFiles([]);

      } catch (error: any) {
        console.log("error: ", error)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.data.detail,
        })
      }
    }
  }


  return (
    <>
      <FileUploader
        value={files}
        onValueChange={handleFileChange}
        dropzoneOptions={dropZoneConfig}
        className="relative max-w-xs space-y-1"
      >
        {isLoading && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: 10 }}
          >
            <Box sx={{ display: "flex" }}>
              <CircularProgress className="w-60 h-60" />
            </Box>
          </div>
        )}
        <FileInput  className="border border-dashed border-gray-500">
          <Button variant={"outline"}>Upload a file</Button>
        </FileInput>
        <FileUploaderContent className="mb-5">
          {files.map((file, i) => (
            <FileUploaderItem key={i} index={i}>
              {file.name}
            </FileUploaderItem>
          ))}
        </FileUploaderContent>
        <div
          className={`${files.length === 0 && "hidden"} flex justify-center`}
        >
          <Button onClick={handleSubmit} disabled={isLoading || isLoadingGet}>
            Submit
          </Button>
        </div>
      </FileUploader>

    </>
  )
}

export default CustomFileUploader
