import React from "react"

const ChatHeader = () => {
  return (
    <div className="flex justify-between items-center bg-blue-500 h-8 rounded-t-md pl-2 pr-2">
      <span className="h-6 text-white">그룹 채팅</span>
      <button className="w-6 h-6 text-white">X</button>
    </div>
  )
}

export default ChatHeader
