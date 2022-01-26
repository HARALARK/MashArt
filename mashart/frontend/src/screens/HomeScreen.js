import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import WelcomeScreen from "./WelcomeScreen"

const Homepage = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return userInfo ? ( <
        Container > Home Screen < /Container>
    ) : ( <
        div className = "welcome-container" >
        <
        WelcomeScreen / >
        <
        /div>
    )
}

const Container = styled.section `
  padding: 1rem 2rem;
`

export default Homepage