import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import WelcomeScreen from "./WelcomeScreen"

const Homepage = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return userInfo ? <Container>Home Screen</Container> : <WelcomeScreen />
}

const Container = styled.section`
  padding: 1rem 2rem;
  height: calc(100vh - 160px);
  width: 1200px;
`

export default Homepage
