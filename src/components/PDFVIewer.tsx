import React, { useEffect, useState } from "react"
import ReactLoading from "react-loading"

import { useGetPdfQuery } from "@/features/api/apiSlice"
import { useParams } from "react-router-dom"

export const PDFVIewer = () => {
  const { doc_name } = useParams()
  // const viewerDiv=useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetching, isError } = useGetPdfQuery(doc_name)

  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  console.log("doc_name: ", doc_name)

  console.log("pdf: ", data)

  console.log("pdfurl: ", pdfUrl)

  useEffect(() => {
    if (data) {
      setPdfUrl(data.data)
    }
  }, [data])

  return (
    <>
      <div className="h-full w-full flex flex-col">
        {(isLoading || isFetching) && (
          <div className="h-full flex flex-col flex-1 align-middle items-center justify-center space-y-3">
            <ReactLoading
              type={"spinningBubbles"}
              color={"#E5E7E9"}
              height={30}
              width={65}
            />
            <p className="text-slate-300 pt-10">Loading PDF...</p>
          </div>
        )}

        {pdfUrl && !isFetching && (
          <iframe
            src={pdfUrl}
            className="h-full w-full"
            loading="lazy"
            title="PDF-file"
          ></iframe>
        )}
      </div>
    </>
  )
}
