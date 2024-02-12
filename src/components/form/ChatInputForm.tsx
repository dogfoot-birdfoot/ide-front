import React from "react"

const ChatInputForm = () => {
  const sendMessage = (e: any) => {
    const textarea = document.getElementById("chatMessage") as HTMLTextAreaElement
    textarea.value = ""
    e.preventDefault()
  }

  const pressEnter = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      if (!e.repeat) {
        const newEvent = new Event("submit")
        e.target.value = ""
        e.target.form.dispatchEvent(newEvent)
      }

      e.preventDefault()
    }
  }

  return (
    <form className="flex justify-center items-center border-t pt-1 pl-1 pb-1 h-20 border-gray-400">
      <textarea
        id="chatMessage"
        onKeyDown={pressEnter}
        className="border text-sm border-gray-400 w-5/6 h-full rounded-md break-words"
      ></textarea>
      <button className="ml-2 w-6 h-6 rounded-full bg-gray-300" onClick={sendMessage}>
        S
      </button>
    </form>
  )
}

export default ChatInputForm
