import React from "react"
import { useNavigate } from "react-router-dom"
import SignUpForm from "../../../components/form/SignUpForm"

const SignUp = () => {
  const navigation = useNavigate()
  const handleSignUpAndLogin = (email: string, password: string) => {
    navigation("/")
  }
  return <SignUpForm title={"Register"} getDataForm={handleSignUpAndLogin} />
}

export default SignUp
