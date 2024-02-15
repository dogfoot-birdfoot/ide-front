import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw } from "@fortawesome/free-solid-svg-icons"

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-700">
      <div className="animate-bounce text-brown-600">
        <FontAwesomeIcon icon={faPaw} className="w-24 h-24" />
      </div>
      <h2 className="text-center text-white text-xl font-semibold mt-4 opacity-0 animate-fadeIn">
        개발을 시작해주세요😊
      </h2>
    </div>
  )
}

export default Loading
