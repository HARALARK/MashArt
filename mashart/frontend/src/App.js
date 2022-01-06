import React from "react"
import { Routes, Route } from "react-router-dom"
import styled from "styled-components"
import "./App.css"
import Footer from "./components/Footer"

import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import SignupScreen from "./screens/SignupScreen"

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <AppContainer>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </AppContainer>
      </div>
      <Footer />
    </>
  )
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`

export default App
