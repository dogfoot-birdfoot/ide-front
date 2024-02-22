import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store"

import ChatModal from "@/components/modal/ChatModal"
import { toggleChatButton } from "@/pages/IDEPage/ChatButtonSlice"
import { useActiveFile } from "@/context/ActiveFileContext"

import CIcon from "@coreui/icons-react"
import { cilCommentBubble } from "@coreui/icons"

const ChatButton = () => {
  const isModalOpened = useSelector((state: RootState) => state.chatButton.value)
  const dispatch = useDispatch()
  const { tabs } = useActiveFile()

  return (
    <div>
      <button
        onClick={() => dispatch(toggleChatButton(), console.log(tabs))}
        className={
          "w-5 h-5 border-black flex justify-center items-center rounded-full fixed right-3 z-50" +
          (isModalOpened ? " bg-blue-300" : " bg-blue-500") +
          (tabs.length == 0 ? " top-14" : " top-24")
        }
      >
        <CIcon className="w-3 h-3 mb-0.5" icon={cilCommentBubble} />
      </button>
      {isModalOpened && <ChatModal></ChatModal>}
    </div>
  )
}

export default ChatButton
