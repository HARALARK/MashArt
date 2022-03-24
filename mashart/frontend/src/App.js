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
import EditProfileScreen from "./screens/EditProfileScreen"
import PageNotFoundScreen from "./screens/PageNotFoundScreen"
import SearchScreen from "./screens/SearchScreen"
import PostScreen from "./screens/PostScreen"
import EditArtScreen from "./screens/EditArtScreen"
import ComicsScreen from "./screens/ComicsScreen"
import ActivityScreen from "./screens/ActivityScreen"
import ChatsScreen from "./screens/ChatsScreen"
import PlaylistScreen from "./screens/PlaylistScreen"

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
              <Route path="/profile">
                <Route path=":id" element={<ProfileScreen />} />
                <Route path="" element={<ProfileScreen />} />
              </Route>
              <Route path="/collab" element={<CollabScreen />} />
              <Route path="/collab/room" element={<EditArtScreen />} />
              <Route
                path="/forgot-password"
                element={<ForgotPasswordScreen />}
              />
              <Route
                path="/reset-password/:resetLink"
                element={<ResetPasswordScreen />}
              />
              {/* <Route path="/room-start" element={<RoomStartScreen />} /> */}
              <Route path="/edit-profile" element={<EditProfileScreen />} />
              <Route path="/post/create" element={<PostScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/comics" element={<ComicsScreen />} />
              <Route path="/activity" element={<ActivityScreen />} />
              <Route path="/chat" element={<ChatsScreen />} />
              <Route path="/playlist" element={<PlaylistScreen />} />
              <Route path="*" element={<PageNotFoundScreen />} />
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
  width: 1000px;

  & .welcome-container {
    display: flex;
    justify-content: center;
  }
`

export default App
