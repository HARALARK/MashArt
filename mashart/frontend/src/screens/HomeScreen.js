import React from "react"
import { useSelector } from "react-redux"
import WelcomeScreen from "./WelcomeScreen"

const Homepage = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return userInfo ? <div> Home Page </div> : <WelcomeScreen />
}

export default Homepage
