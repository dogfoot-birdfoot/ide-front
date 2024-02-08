import React from "react"
import { messageProps } from "type"

const Message = ({ id, text }: messageProps) => {
  return (
    <div className={"mt-1 ml-1 mr-1 flex justify-top " + (id === 1 ? "justify-start" : "justify-end")}>
      <div
        className={(id === 1 ? "bg-red-300 " : "bg-blue-300 ") + "inline-block rounded-full w-6 h-6 mr-2 text-center"}
      >
        {id}
      </div>
      <div
        className={
          (id === 1 ? "bg-gray-200 border border-blue-300 " : "bg-blue-500 ") +
          "inline-block w-fit max-w-48 pl-1 pr-1 rounded-md"
        }
      >
        {text}
      </div>
    </div>
  )
}

export default Message
