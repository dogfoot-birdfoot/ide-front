import React from "react"
import { Link } from "react-router-dom"
import SignUp from "@/components/form/SignUp"

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 m-4 bg-white rounded shadow-lg w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-6">회원가입</h1>

        <SignUp />
        <p className="mt-4 text-center">
          이미 계정이 있습니까?{" "}
          <Link to={"/login"} className="text-blue-500 hover:text-blue-700">
            로그인
          </Link>
        </p>
        <Link to={"/container"}> 컨테이너 페이지 접근하기</Link>
      </div>
    </div>
  )
}

export default RegisterPage
