import React, { useEffect, useState } from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { BotMessageSquare, FileText } from "lucide-react"
import { useGetPdfQuery } from "@/features/api/apiSlice"
import { useParams } from "react-router-dom"
import { PDFVIewer } from "@/components/PDFVIewer"
import ChatBotWindow from "@/components/ChatBotWindow"

const DocChatbot = () => {
  const { doc_name } = useParams()
  // const viewerDiv=useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetching, isError } = useGetPdfQuery(doc_name)

  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  useEffect(() => {
    if (data) {
      setPdfUrl(data.data)
    }
  }, [data])

  // if(pdfUrl){
  //   console.log("test ")
  //   WebViewer({
  //     path: 'lib',
  //     initialDoc: pdfUrl},
  //     viewerDiv.current as HTMLDivElement).then();
  // }

  console.log("doc_name: ", doc_name)

  console.log("pdf: ", data)

  console.log("pdfurl: ", pdfUrl)

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="pr-2">
          <div className="flex w-full h-full flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 rounded-lg bg-bgleft">
            <p className="text-slate-100">
              Select a document of your choice on the right panel to start a
              conversation
            </p>
            <div className="w-full h-full ">
              <PDFVIewer></PDFVIewer>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel className="pl-2">
          <div className="w-full h-full flex flex-col px-4 py-5 rounded-lg bg-bgleft">
            <p className="text-slate-100">
              Select a document of your choice on the right panel to start a
              new conversation
            </p>
            <div className="flex-1 w-full h-full">
              <ChatBotWindow></ChatBotWindow>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export default DocChatbot
