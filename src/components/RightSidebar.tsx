import React from "react"
import { useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import ReactLoading from "react-loading"

import { useGetAllDocsQuery } from "@/features/api/apiSlice"

interface Document {
  id: number
  doc_name: string
  uploaded_time: string // Assuming timestamp is a string in ISO format
  // Add more fields as needed
}

interface GroupedData {
  [date: string]: Document[]
}

const RightSidebar = () => {
  const [open, setOpen] = useState(true)
  const currenRoute = useLocation()

  const {
    data: data,
    isError,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetAllDocsQuery({});

  const route = currenRoute.pathname

  console.log("data: ", data)

  // Function to group documents by date
  const groupDocumentsByDate = (
    documents: Document[] | undefined,
  ): GroupedData => {
    const grouped: GroupedData = {}
    documents?.forEach(doc => {
      const date = new Date(doc.uploaded_time).toLocaleDateString("en-US")
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(doc)
    })
    return grouped
  }

  // Group documents by date
  const groupedData: GroupedData = groupDocumentsByDate(data?.data)

  // Sort the dates in descending order
  const sortedDates = Object.keys(groupedData).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  )

  return (
    <div>
      <div
        className={` ${
          open ? "w-60" : "w-10"
        } bg-blacksidebar h-screen p-5  pt-8 relative duration-500 flex flex-col border-r`}
      >
        <img
          src="./control.png"
          alt="okie"
          className={`absolute cursor-pointer -left-3 top-9 w-7 border-dark-purple duration-500
                  border-2 rounded-full ${open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <h1
            className={`text-slate-300 pl-3 pt-1 origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Document List
          </h1>
        </div>

        {(isLoading || isFetching) && (
          <div className="h-full flex flex-col align-middle items-center justify-center space-y-3">
            <ReactLoading
              type={"cylon"}
              color={"#E5E7E9"}
              height={30}
              width={120}
            />
            <p className="text-slate-300 pt-10">Loading...</p>
          </div>
        )}

        {/* {(data && open) && (<ul className="pt-6">
          {data.data.map((item:any)=>(
            <li key={item.doc_name}>
              <p className="text-slate-300">{item.doc_name}</p>
            </li>
          ))}
        </ul>)
        } */}

        {isSuccess && open && (
          <div>
            {sortedDates.map(date => (
              <div key={date}>
                <h2 className="text-slate-400 pl-2 font-medium pt-3 text-sm">
                  {date}
                </h2>
                <ul className="pt-2">
                  {groupedData[date].map(doc => (
                    <Link to={`/chat_bot/${doc.doc_name}`}>
                      <li
                        key={doc.id}
                        className="my-1 px-2 py-1 hover:rounded-md hover:bg-bghover cursor-pointer transition-all duration-500"
                      >
                        <p className="text-slate-300">{doc.doc_name.length>15 ? doc.doc_name.slice(0,20) + "..." : doc.doc_name }</p>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RightSidebar
