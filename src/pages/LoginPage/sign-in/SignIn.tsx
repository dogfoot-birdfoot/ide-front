import React from "react"
import Form from "../../../components/form/Form"
import { useNavigate } from "react-router-dom"

const SignIn = () => {
  const navigate = useNavigate()
  const handleLogin = (email: string, password: string) => {
    navigate("/")
  }
  return <Form title={"Login"} getDataForm={handleLogin} />
}

export default SignIn
