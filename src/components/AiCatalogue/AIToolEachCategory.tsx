import { useGetAiToolsForAllCategoryQuery } from "@/features/api/apiSlice"
import { Skeleton } from "@mui/material"
import { Star, StarIcon, VerifiedIcon } from "lucide-react"
import { A } from "node_modules/@clerk/clerk-react/dist/controlComponents-B9SlJ0L1.mjs"
import React from "react"
import { FaTrademark } from "react-icons/fa6"

interface AIToolEachCategoryProps {
  category_full: string
  category_short: string
}

const dummy_skeleton = [
  {
    item: 1,
  },
  {
    item: 1,
  },
  {
    item: 1,
  },
  {
    item: 1,
  },
  {
    item: 1,
  },
  {
    item: 1,
  },
]

const AIToolEachCategory: React.FC<AIToolEachCategoryProps> = ({
  category_full,
  category_short,
}) => {
  const {
    data: aiTools,
    isLoading,
    isFetching,
    isError,
  } = useGetAiToolsForAllCategoryQuery(category_short)

  console.log("ai tools: ", aiTools)

  if (isLoading || isFetching) {
    return (
      <div>
        <div className="w-full">
          <Skeleton
            variant="rectangular"
            width={200}
            height={30}
            className="mb-3"
          />
          <div className="w-full flex flex-row space-x-1 justify-between">
            {dummy_skeleton.map(item => (
              <div>
                <Skeleton variant="rectangular" width={280} height={150} />
                <Skeleton width={250}></Skeleton>
                <Skeleton width={200}></Skeleton>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="w-full">
        {/* title */}
        <p className="text-2xl text-slate-600 pl-1 mt-3">{category_full}</p>

        {/* list ai tool */}
        <div className="w-full flex flex-row">
          {aiTools?.data.map((item: any, index: any) => (
            <div key={index} className="w-1/6 p-2">
              <a href={item.tool_url} target="_blank" rel="noopener noreferrer">
                <div className="rounded-2xl border-customPink w-full h-60 shadow-lg border-2 overflow-hidden flex flex-col">
                  {/* featured */}
                  <div className="h-[12%] bg-[#f9ebea] flex flex-row justify-center items-center space-x-2">
                    <Star className="" color="#e74c3c"></Star>
                    <p className="text-slate-500">Featured</p>
                  </div>

                  {/* image  */}
                  <div className="h-[40%] w-full flex flex-col justify-center items-center pt-6 overflow-hidden">
                    <img
                      src={item.icon_url}
                      alt={item.tool_name}
                      className="w-40 h-40 object-cover"
                    ></img>
                  </div>

                  {/* title */}
                  <div className="pt-6 flex justify-center items-center">
                    <p className="text-slate-600 font-medium text-lg relative">
                      {item.tool_name}
                      <div className="absolute w-full h-[3px] bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <div className="absolute right-[-24px] bottom-3">
                        <VerifiedIcon className="text-yellow-500"></VerifiedIcon>
                      </div>
                    </p>
                  </div>

                  {/* tags  */}
                  <div className="flex flex-row justify-center space-x-2 mt-5">
                    {!item.api_support && (
                      <p className="rounded-xl bg-purple-400 px-2 text-sm text-white">
                        API support
                      </p>
                    )}
                    {!item.free && (
                      <p className="rounded-xl bg-green-400 px-2 text-sm text-white">
                        Free trial
                      </p>
                    )}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AIToolEachCategory
