import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store"
import { closeChatButton } from "@/pages/IDEPage/ChatButtonSlice"

const ChatHeader = () => {
  const isModalOpened = useSelector((state: RootState) => state.chatButton.value)
  const dispatch = useDispatch()

  return (
    <div className="flex justify-between items-center bg-blue-500 h-8 text-sm rounded-t-md pl-2 pr-2">
      <span className="mt-1 h-6 text-white">그룹 채팅</span>
      <button onClick={() => dispatch(closeChatButton())} className="w-6 h-6 text-white">
        X
      </button>
    </div>
  )
}

export default ChatHeader
