import React, { useState } from "react"
import { messageListProps } from "type"
import Message from "./Message"

const Messages = () => {
  const [messageList, setMessageList] = useState<messageListProps[]>([
    { id: 1, text: "Hello" },
    { id: 2, text: "Hi" },
    { id: 2, text: "How are you?" },
    { id: 1, text: "Hello" },
    { id: 2, text: "Hi" },
    {
      id: 2,
      text: "How are you? How are you?How are you?How are you?How are you?How are you?How are you?How are you?How are you?"
    },
    {
      id: 1,
      text: "so good."
    }
  ])

  return (
    <div className="h-96 w-72 mt-2 overflow-y-auto break-words scrollbar-hide">
      {messageList.map((item, idx) => {
        return <Message key={idx} id={item.id} text={item.text} />
      })}
    </div>
  )
}

export default Messages
