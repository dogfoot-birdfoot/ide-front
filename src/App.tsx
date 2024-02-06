import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import IDE from "./pages/IDEPage/IDE"
import WelcomePage from "./pages/WelcomePage/WelcomePage"
import RegisterPage from "./pages/RegisterPage/Register"
import ContainerPage from "./pages/ContainerPage/Container"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/container" element={<ContainerPage />}></Route>
        <Route path="/ide" element={<IDE />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
