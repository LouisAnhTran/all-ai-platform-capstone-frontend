import React from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { BotMessageSquare, FileText } from "lucide-react"
import { useGetPdfQuery } from "@/features/api/apiSlice"
import { useParams } from "react-router-dom"

const DocChatBotHome = () => {

  return (
    <>
      <ResizablePanelGroup direction="horizontal">

        <ResizablePanel className="pr-2">
          <div className="flex w-full h-full flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 rounded-lg bg-bgleft">
            <p className="text-slate-100">Select a document of your choice on the right panel to start a conversation</p>
            <div className="flex flex-col w-full h-full justify-center items-center align-middle">
              <FileText className="text-slate-300 h-16 w-16"></FileText>
              <p className="pt-3 text-xl text-slate-300">PDF Viewer</p>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle/>

        <ResizablePanel className="pl-2">
        <div className="flex w-full h-full flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 rounded-lg bg-bgleft">
            <p className="text-slate-100">Select a document of your choice on the right panel to start a conversation</p>
            <div className="flex flex-col w-full h-full justify-center items-center align-middle">
              <BotMessageSquare className="text-slate-300 h-16 w-16"></BotMessageSquare>
              <p className="pt-3 text-xl text-slate-300">Chat Bot Engine</p>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export default DocChatBotHome
