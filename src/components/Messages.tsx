import React, { useState } from "react"
import { messageListProps } from "type"
import Message from "./Message"

const Messages = () => {
  const [messageList, setMessageList] = useState<messageListProps[]>([
    { id: 1, text: "HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello" },
    { id: 2, text: "Hi" },
    { id: 2, text: "EHEFOEKFPWEHEFOEKFPWEHEFOEKFPW" },
    { id: 2, text: "EHEFOEKFPWEHEFOEKFPWEHEFOEKFPW" },
    { id: 2, text: "EHEFOEKFPWEHEFOEKFPWEHEFOEKFPW" },
    { id: 2, text: "EHEFOEKFPWEHEFOEKFPWEHEFOEKFPW" },
    { id: 2, text: "EHEFOEKFPWEHEFOEKFPWEHEFOEKFPW" },
    { id: 2, text: "EHEFOEKFPWEHEFOEKFPWEHEFOEKFPW" }
  ])

  return (
    <div className="h-3/4 w-72 mt-2 overflow-y-auto break-words">
      {messageList.map((item, idx) => {
        return <Message key={idx} id={item.id} text={item.text} />
      })}
    </div>
  )
}

export default Messages
