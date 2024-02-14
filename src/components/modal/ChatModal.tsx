import React from "react"
import ChatInputForm from "@/components/form/ChatInputForm"
import Messages from "@/components/message/Messages"
import ChatHeader from "@/components/header/ChatHeader"

const ChatModal = () => {
  return (
    <div className="absolute w-72 border border-blue-500 rounded-lg right-4 top-20 z-50 bg-white">
      <ChatHeader></ChatHeader>
      <Messages></Messages>
      <ChatInputForm></ChatInputForm>
    </div>
  )
}

export default ChatModal
