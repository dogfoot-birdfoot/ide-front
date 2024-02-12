import React from "react"
import CIcon from "@coreui/icons-react"
import { cilCommentBubble } from "@coreui/icons"
import ChatModal from "../modal/ChatModal"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store"
import { toggleChatButton } from "@/pages/IDEPage/ChatButtonSlice"

const ChatButton = () => {
  const isModalOpened = useSelector((state: RootState) => state.chatButton.value)
  const dispatch = useDispatch()

  return (
    <div>
      <button
        onClick={() => dispatch(toggleChatButton())}
        className="w-5 h-5 border-black bg-gray-300 rounded-full top-0 right-0"
      >
        {!isModalOpened && <CIcon icon={cilCommentBubble} size="sm" />}
      </button>
      {isModalOpened && <ChatModal></ChatModal>}
    </div>
  )
}

export default ChatButton
