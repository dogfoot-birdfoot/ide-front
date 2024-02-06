import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import WelcomePage from "./pages/WelcomePage/WelcomePage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import ContainerPage from "./pages/ContainerPage/Container"
import IDEPage from "./pages/IDEPage/IDEPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/container" element={<ContainerPage />}></Route>
        <Route path="/ide" element={<IDEPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
