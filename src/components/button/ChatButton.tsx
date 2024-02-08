import React, { useState } from "react"
import CIcon from "@coreui/icons-react"
import { cilCommentBubble } from "@coreui/icons"
import ChatModal from "../modal/ChatModal"

const ChatButton = () => {
  const toggleModal = () => {
    setIsModalOpened(!isModalOpened)
  }

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)

  return (
    <div>
      <button onClick={toggleModal} className="w-5 h-5 border-black bg-gray-300 rounded-full top-0 right-0">
        {isModalOpened && <CIcon icon={cilCommentBubble} size="sm" />}
      </button>
      {isModalOpened && <ChatModal></ChatModal>}
    </div>
  )
}

export default ChatButton
