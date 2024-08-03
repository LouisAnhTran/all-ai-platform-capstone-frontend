import React from "react"
import { useLocation } from "react-router-dom"
import { styled } from "@mui/material/styles"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

import { useFetchMessagesQuery } from "@/features/api/apiSlice"
import { Button } from "@/components/ui/button"
import CustomFileUploader from "@/components/FileUploader"
import { useUploadFileMutation } from "@/features/api/apiSlice"
import { UseDispatch } from "react-redux"
import { useToast } from "@/components/ui/use-toast"
import { useGetAllDocsQuery } from "@/features/api/apiSlice"

import EnhancedTable from "@/components/Table"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import { FileX } from "lucide-react"

interface Data {
  id: number
  doc_name: string
  no_of_pages: number
  doc_size: number
  uploaded_time: string
  init_chat: string
}

function createData(
  id: number,
  doc_name: string,
  no_of_pages: number,
  doc_size: number,
  uploaded_time: string,
  init_chat: string,
): Data {
  return {
    id,
    doc_name,
    no_of_pages,
    doc_size,
    uploaded_time,
    init_chat,
  }
}

const Documents = () => {
  // const { data, isError, isLoading, isFetching } = useFetchMessagesQuery('notes_01.pdf')


  const { data: data, isError, isLoading, isFetching } = useGetAllDocsQuery({})

  console.log("data_managment: ", data)

  let initial_rows: Data[] = []

  if (data) {
    initial_rows = data.data.map((item: any, index: number) =>
      createData(index, item.doc_name, item.no_of_pages, item.doc_size, item.uploaded_time, "2"),
    )
  }

  console.log("data: ",data)

  return (
    <div>
      <CustomFileUploader
        isLoadingGet={isLoading || isFetching}
      ></CustomFileUploader>

      {(isLoading || isFetching) && (
        <div className="pt-96 h-full flex flex-col justify-center items-center">
          <CircularProgress />
        </div>
      )}

      {!isLoading && !isFetching && data && (
        <>
          <EnhancedTable initialRows={initial_rows}></EnhancedTable>
          {data.data.length === 0 && (
            <div className="mt-32 flex h-full flex-col justify-center align-middle items-center">
              <FileX className="w-16 h-16 text-slate-500 opacity-35"></FileX>
              <p className="pt-4 text-slate-500">You haven't uploaded any file, please proceed to upload file</p>
          </div>)}
        </>
      )}
    </div>
  )
}

export default Documents
