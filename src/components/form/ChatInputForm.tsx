import React from "react"

const ChatInputForm = () => {
  const sendMessage = ({}) => {
    console.log(1)
  }
  return (
    <form className="flex justify-center items-center border-t pt-1 pl-1 pb-1 h-20 border-black">
      <textarea className="border border-black w-5/6 h-full rounded-md break-words"></textarea>
      <button className="ml-2 w-6 h-6 rounded-full bg-gray-300" onClick={sendMessage}>
        I
      </button>
    </form>
  )
}

export default ChatInputForm
