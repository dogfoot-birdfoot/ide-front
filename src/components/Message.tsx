import React from "react"
import { messageProps } from "type"

const Message = ({ id, text }: messageProps) => {
  return (
    <div>
      {id === 1 ? (
        <div className={"mt-1 ml-1 mr-1 flex justify-top justify-start items-end"}>
          <div className="bg-purple-400 inline-block rounded-full w-6 h-6 mr-2 text-center items-start">{id}</div>
          <div className="bg-gray-200 border border-gray-400 inline-block w-fit max-w-48 pl-1 pr-1 rounded-md">
            {text}
          </div>
          <div className="inline-block w-fit max-w-48 pl-1 pr-1 text-xs">15:39</div>
        </div>
      ) : (
        <div className={"mt-1 ml-1 mr-1 flex justify-top justify-end items-end"}>
          <div className="inline-block w-fit max-w-48 pl-1 pr-1 text-xs">15:39</div>
          <div className="bg-blue-400 border border-blue-500 inline-block w-fit max-w-48 pl-1 pr-1 rounded-md">
            {text}
          </div>
        </div>
      )}
    </div>
  )
}

export default Message
