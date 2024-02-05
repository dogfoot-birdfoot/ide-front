import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "@/pages/welcome";
import Login from "@/pages/login";
import Register from "./pages/register";
import Container from "./pages/container";
import IDE from "./pages/IDE";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/container" element={<Container />}></Route>
          <Route path="/ide" element={<IDE />}></Route>
        </Routes>
    </BrowserRouter>
  );
  
}

export default App;
