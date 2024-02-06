import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Welcome from "./pages/WelcomePage";
import Register from "./pages/RegisterPage/Register";
import Container from "./pages/Contianer/Container";
import IDE from "./pages/IDEPage/IDE";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/container" element={<Container />}></Route>
        <Route path="/ide" element={<IDE />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
