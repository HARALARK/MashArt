import React from "react"
import { Routes, Route } from "react-router-dom"
import styled from "styled-components"
import "./App.css"
import Footer from "./components/Footer"

import Header from "./components/Header"
import CollabScreen from "./screens/CollabScreen"
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen"

import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import ProfileScreen from "./screens/ProfileScreen"
import SignupScreen from "./screens/SignupScreen"
import ResetPasswordScreen from "./screens/ResetPasswordScreen"

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <AppContainer>
          <ScreensContainer>
            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/collab" element={<CollabScreen />} />
              <Route
                path="/forgot-password"
                element={<ForgotPasswordScreen />}
              />
              <Route
                path="/reset-password/:resetLink"
                element={<ResetPasswordScreen />}
              />

            </Routes>
          </ScreensContainer>
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

const ScreensContainer = styled.div`
  height: calc(100vh - 160px);
  width: 900px;

  & .welcome-container {
    display: flex;
    justify-content: center;
  }
`

export default App
