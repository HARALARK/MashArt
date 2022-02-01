import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import PostCard from "../components/PostCard/PostCard"
import WelcomeScreen from "./WelcomeScreen"

const Homepage = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return userInfo ? (
    <Hero>
      <Container>
        <PostCard />
        <PostCard />
      </Container>
    </Hero>
  ) : (
    <div className="welcome-container">
      <WelcomeScreen />
    </div>
  )
}

const Hero = styled.section`
  width: 100%;
  height: 360px;
  border-radius: 20px;
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: -8px 6px 16px 0px rgba(0, 0, 0, 0.4);
  margin: 40px 0;
  background-color: var(--primary);
`
const Container = styled.section`
  padding: 1rem 2rem;
`

export default Homepage
