import React, { useEffect, useRef, useState } from "react"

import { useGenarateResponseStreamQuery } from "@/features/api/apiSlice"
import { useFetchAllMessagesQuery } from "@/features/api/apiSlice"
import { useParams } from "react-router-dom"
import ReactLoading from "react-loading"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp } from "lucide-react"
import type { FC } from "react" // Import types only
import { parse } from "path"
import { log, timeStamp } from "console"
import { set } from "react-hook-form"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm" // For GitHub-flavored markdown support

interface Message {
  role: string
  content: string
  timestamp: string
}

const apiBaseUrl =  "https://pdf-query-pro-backend.louis-anh-tran.com/api/v1"

function getFormattedTimestamp() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0") // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0")

  // To get microseconds, you need to generate a random number as JavaScript does not have microseconds resolution
  const microseconds = String(Math.floor(Math.random() * 1000)).padStart(3, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${microseconds}`
}

const ChatBotWindow = () => {
  const { doc_name } = useParams()
  const [prompt, setPrompt] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])

  // / Reference to the scrollable container
  const scrollRef = useRef<HTMLDivElement>(null)

  const [streamData, setStreamData] = useState<string[]>([])
  const [intermediateString, setIntermediateString] = useState<string | null>(
    "",
  )
  const [isLoadingStream, setIsLoadingSTream] = useState<boolean>(false)
  const [isErrorStream, setIsErrorStream] = useState<boolean>(false)

  const { data, isLoading, isFetching, isError } =
    useFetchAllMessagesQuery(doc_name)

  console.log("data: ", data)

  console.log("messages_updated: ", messages)

  console.log("prompt: ", prompt)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setPrompt("")
    setIsLoadingSTream(true)
    setIsErrorStream(false)
    setStreamData([])
    setIntermediateString("")

    const newMessage: Message = {
      role: "user",
      content: prompt,
      timestamp: getFormattedTimestamp(), // Use Date object
    }

    const newMessages = [...messages, newMessage]

    console.log("new_messages: ", newMessages)

    setMessages(newMessages)

    console.log("test_body: ", {
      list_of_messages: newMessages,
    })

    console.log("intermediateString: ", intermediateString)

    try {
      const response = await fetch(
        `${apiBaseUrl}/generate_response/${doc_name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ list_of_messages: newMessages }),
        },
      )

      if (!response.body) {
        throw new Error("ReadableStream not supported")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let chunk = ""
      const loopRunner = true

      const read = async () => {
        while (loopRunner) {
          const { done, value } = await reader.read()
          if (done) break

          console.log("value ", value)

          chunk += decoder.decode(value, { stream: true })
          const parts = chunk.split("\n")

          console.log("chunk: ", chunk)

          console.log("parts: ", parts)

          parts.forEach((part, index) => {
            if (part) {
              try {
                const parsed = JSON.parse(part)

                if (Object.keys(parsed).includes("intermediate_token")) {
                  console.log(
                    "can_see_intermediate_token ",
                    parsed.intermediate_token,
                  )
                  setIntermediateString(
                    preString => preString + parsed.intermediate_token,
                  )
                } else {
                  console.log("can_see_last_token")
                  setMessages(prevMessages => [
                    ...prevMessages,
                    {
                      content: parsed.last_token,
                      role: "system",
                      timestamp: getFormattedTimestamp(),
                    },
                  ])
                }

                console.log("parsed: ", parsed)
              } catch (e) {
                console.error("Error parsing JSON:", e)
              }
            }
          })
        }
      }

      await read()

      setIsLoadingSTream(false)

      console.log("final_string: ", intermediateString)
    } catch (error) {
      setIsErrorStream(true)
      console.error("Error fetching stream:", error)
    } finally {
      setIsLoadingSTream(false)
    }
  }

  // use effect
  useEffect(() => {
    if (data) {
      setMessages(data.data)
    }
  }, [data])

  // Auto-scroll to bottom on messages or intermediateString update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, intermediateString])

  return (
    <>
      <div className="h-full w-full flex flex-col">
        {(isLoading || isFetching) && (
          <div className="h-full flex flex-col flex-1 align-middle items-center justify-center space-y-3">
            <ReactLoading
              type={"cylon"}
              color={"#E5E7E9"}
              height={30}
              width={120}
            />
            <p className="text-slate-300 pt-10">Loading conversation...</p>
          </div>
        )}

        {/* render messages */}
        {!isLoading && !isFetching && messages && (
          <>
            {!messages.length ? (
              <div className="h-full flex flex-col align-middle items-center justify-center space-y-3">
                <p className="text-slate-300 pt-10">No conversation</p>
              </div>
            ) : (
              <>
                <div
                  className="h-full w-full flex flex-col overflow-y-auto"
                  ref={scrollRef}
                >
                  {messages.map((item: any) => (
                    <>
                      {item.role === "user" ? (
                        <div className="flex flex-row justify-end my-2">
                          <p className="max-w-[60%] text-sm rounded-3xl bg-input p-3 text-slate-300">
                            {item.content}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-start my-2">
                          <p className="max-w-[80%] text-sm rounded-3xl bg-input p-3 text-slate-300">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {item.content}
                            </ReactMarkdown>
                          </p>
                        </div>
                      )}
                    </>
                  ))}

                  {isLoadingStream && (
                    <div className="flex flex-row justify-start my-2">
                      <p className="max-w-[80%] text-sm rounded-3xl bg-input p-3 text-slate-300 flex flex-col align-middle items-center justify-center">
                        {!intermediateString ? (
                          <ReactLoading
                            type={"bubbles"}
                            color={"#E5E7E9"}
                            height={30}
                            width={40}
                          />
                        ) : (
                          <>{intermediateString}</>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {(!isLoading && !isFetching) && (
          <div className="flex w-full flex-col align-middle items-center justify-center bg-bgleft p-1 h-[10%]">
            <div className="w-full bg-input m-0 rounded-3xl pt-5 pb-1 px-5 text-slate-100 border-none focus:border-transparent focus:outline-none flex flex-row">
              <textarea
                name=""
                id=""
                value={prompt}
                className="w-full p-0 bg-input h-full text-slate-100 border-none focus:border-transparent focus:outline-none text-sm no-scrollbar overflow-hidden"
                placeholder="Message PDFQueryPro"
                onChange={e => setPrompt(e.target.value)}
              ></textarea>
              <div className="">
                <button
                  onClick={handleSubmit}
                  className="bg-textarea rounded-full w-8 h-8 flex align-middle justify-center items-center"
                >
                  <ArrowUp className="text-input1"></ArrowUp>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div></div>
    </>
  )
}

export default ChatBotWindow
