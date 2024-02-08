import React, { useState } from "react"

const ChatModal = () => {
  const toggleModal = () => {
    setIsModalOpened(!isModalOpened)
  }

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  return <button className="w-10 h-10 border-black bg-red-50 rounded-full">Chat</button>
}

export default ChatModal
