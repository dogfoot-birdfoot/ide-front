import React from "react"
import ChatInputForm from "@/components/form/ChatInputForm"
import Messages from "@/components/message/Messages"
import ChatHeader from "@/components/header/ChatHeader"
import { useActiveFile } from "context/ActiveFileContext"

const ChatModal = () => {
  const { tabs } = useActiveFile()

  return (
    <div
      className={
        "absolute w-72 border border-blue-500 rounded-lg right-3 z-50 bg-white" +
        (tabs.length === 0 ? " top-24" : " top-32")
      }
    >
      <ChatHeader></ChatHeader>
      <Messages></Messages>
      <ChatInputForm></ChatInputForm>
    </div>
  )
}

export default ChatModal
