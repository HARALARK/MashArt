import React from "react"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import "./App.css"

import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen"
import SignupScreen from "./screens/SignupScreen"

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route
            path="/signup"
            element={<SignupScreen location={location} navigate={navigate} />}
          />
        </Routes>
      </div>
    </>
  )
}

export default App
