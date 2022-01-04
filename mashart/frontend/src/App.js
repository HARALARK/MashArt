import React from "react"
import { Routes, Route } from "react-router-dom"
import "./App.css"

import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen"
import SignupScreen from "./screens/SignupScreen"

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
        </Routes>
      </div>
    </>
  )
}

export default App
