import React, { useEffect, useState } from "react"

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
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          className="h-full w-full"
          loading="lazy"
          title="PDF-file"
        ></iframe>
      )}
    </>
  )
}
