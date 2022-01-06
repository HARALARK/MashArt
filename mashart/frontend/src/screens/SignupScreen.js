import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { register } from "../actions/userActions"
import Design from "../components/Design"
import Input from "../components/styled-components/Input"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"

const SignupScreen = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, userInfo, error } = userRegister

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  //TODO: add reducer to check if the username is valid in real time
  const checkUsername = (e) => {
    setUsername(e.target.value)
  }

  //TODO: add reducer to check if the email is valid in real time
  const checkEmail = (e) => {
    setEmail(e.target.value)
  }

  const validation = () => {
    console.log(username.trim().length)
    if (
      username.trim().length < 6 ||
      username.trim().length > 15 ||
      username.trim().includes(" ")
    ) {
      setMessage(
        "Username should be of length 6-15 characters (spaces not allowed)"
      )
      return false
    }
    if (!email.trim().includes("@") || !email.trim().includes(".")) {
      setMessage("Not a valid email")
      return false
    }
    if (password.trim().length < 8 || password.trim().includes(" ")) {
      setMessage("Password should be atleast 8 characters (spaces not allowed)")
      return false
    }
    return true
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (validation()) {
      dispatch(register(username, email, password, confirmPassword))
    }
  }

  return (
    <Hero>
      <Container>
        <div className="design-container">
          <Design />
        </div>
        <div className="form-container">
          <Form>
            <p className="heading">Sign Up</p>
            {loading && <Message>Loading...</Message>}
            {error && <Message variant="error">{error}</Message>}
            {message && <Message variant="error">{message}</Message>}

            <Input
              type="text"
              placeholder="Username*"
              onChange={checkUsername}
              required
            />
            <Input
              type="email"
              placeholder="Email*"
              onChange={checkEmail}
              required
            />
            <Input
              type="password"
              placeholder="Password*"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm Password*"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <SubmitButton
              type="button"
              value="Sign Up"
              onClick={submitHandler}
            />
            <p className="login-container">
              Already have an account?{" "}
              <span>
                <Link
                  className="login-link"
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                >
                  Login
                </Link>
              </span>
            </p>
          </Form>
        </div>
      </Container>
    </Hero>
  )
}

const Hero = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  padding: 0 2rem;

  width: 1200px;

  height: calc(100vh - 80px);

  .design-container {
    display: none;
  }

  .heading {
    color: #fff;
    font-size: 1.5rem;
    text-align: center;
  }

  @media ${device.laptop} {
    flex-direction: row;
    height: calc(100vh - 80px);
    justify-content: space-between;
    gap: 2rem;

    .design-container {
      display: inline-block;
    }
  }
`

const Form = styled.form`
  background-color: #2f2e41;
  padding: 1rem 2rem;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .login-container {
    color: #fff;
    text-align: center;
    margin-bottom: 1rem;
  }

  .login-link {
    color: #dd4a5c;
  }
`

const SubmitButton = styled(Input)`
  background-color: #dd4a5c;
  color: #fff;
  font-weight: 600;
  margin: 1rem 0 0rem;

  cursor: pointer;

  &:hover {
    background-color: #dd4a5cee;
  }
`

export default SignupScreen
