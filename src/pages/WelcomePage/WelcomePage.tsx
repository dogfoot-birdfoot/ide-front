import React from "react"
import { Link } from "react-router-dom"

const WelcomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 m-4 bg-white rounded shadow-lg w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome! 😊</h1>
        <p className="mb-6">Web IDE를 이용하고 싶으신가요?</p>
        <Link to={"/login"}>
          <button className="px-6 py-3 bg-lime-500 text-white text-lg rounded hover:bg-lime-600">
            Web IDE 이용하러가기!
          </button>
        </Link>
      </div>
    </div>
  )
}

export default WelcomePage
