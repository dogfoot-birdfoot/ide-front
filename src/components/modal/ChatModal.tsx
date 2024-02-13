import React from "react"
import ChatInputForm from "@/components/form/ChatInputForm"
import Messages from "@/components/Messages"
import ChatHeader from "@/components/ChatHeader"

const ChatModal = () => {
  return (
    <div className="absolute w-72 h-2/3 border border-blue-500 rounded-lg right-8 top-12 z-50">
      <ChatHeader></ChatHeader>
      <Messages></Messages>
      <ChatInputForm></ChatInputForm>
    </div>
  )
}

export default ChatModal
