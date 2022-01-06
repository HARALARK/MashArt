import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import device from "../screen_sizes/devices"

const Footer = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  return userInfo ? <Container>Footer</Container> : <></>
}

const Container = styled.footer`
  display: flex;
  position: sticky;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #24003e;
  height: 80px;
`

export default Footer
