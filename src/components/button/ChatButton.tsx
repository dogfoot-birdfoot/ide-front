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
        className={
          isModalOpened
            ? "w-5 h-5 border-black bg-blue-300 flex justify-center items-center rounded-full top-0 right-0 "
            : "w-5 h-5 border-black bg-blue-500 flex justify-center items-center rounded-full top-0 right-0 "
        }
      >
        <CIcon className="w-3 h-3 mb-0.5" icon={cilCommentBubble} />
      </button>
      {isModalOpened && <ChatModal></ChatModal>}
    </div>
  )
}

export default ChatButton
