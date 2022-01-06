import React from "react"
import { Routes, Route } from "react-router-dom"
import styled from "styled-components"
import "./App.css"

import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import SignupScreen from "./screens/SignupScreen"

function App() {
  return (
    <>
      <Header />
      <AppContainer>
        <div className="App" style={{ width: "1200px", textAlign: "left" }}>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </div>
      </AppContainer>
    </>
  )
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 2rem;
`

export default App
