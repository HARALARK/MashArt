import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"

import { resetPassword } from "../actions/userActions"
import { Input, PasswordInput } from "../components/styled-components/Input"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"

const ForgotPasswordScreen = () => {
  const { resetLink } = useParams()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")

  const dispatch = useDispatch()

  const resetPasswordInfo = useSelector((state) => state.resetPassword)
  const { loading, success, error } = resetPasswordInfo

  const submitHandler = (e) => {
    e.preventDefault()

    if (password.trim().length < 8 || password.trim().includes(" ")) {
      setMessage("Password should be atleast 8 characters (spaces not allowed)")
      return false
    }
    if (password !== confirmPassword) {
      setMessage("Passwords dont match")
      return false
    }

    setMessage("")
    dispatch(resetPassword(password, resetLink))
  }

  return (
    <Hero>
      <Container>
        <div className="form-container">
          <Form>
            <p className="heading">Reset Password</p>
            {loading && <Message>Loading...</Message>}
            {error && <Message variant="error">{error}</Message>}
            {message && <Message variant="error">{message}</Message>}
            {success && <Message variant="success">{success.message}</Message>}

            <div>
              <PasswordInputContainer>
                <PasswordInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Password*"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="icon-container"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                  ></FontAwesomeIcon>
                </div>
              </PasswordInputContainer>
            </div>
            <Input
              type="password"
              placeholder="Confirm Password*"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <SubmitButton
              className="no-margin"
              type="button"
              value="Change Password"
              onClick={submitHandler}
            />
            <Link to="/" className="return-link">
              <Button>return to HomePage</Button>
            </Link>
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

  height: 100vh;

  .heading {
    color: var(--white);
    font-size: 1.5rem;
    text-align: center;
  }

  @media ${device.laptop} {
    flex-direction: row;
    height: calc(100vh - 80px);
    justify-content: space-between;
    gap: 2rem;
    padding: 0 2rem;
  }
`

const Form = styled.form`
  background-color: var(--secondary);
  padding: 1rem 2rem;
  border-radius: 5px;
  width: 350px;

  gap: 1.2rem;

  display: flex;
  flex-direction: column;

  .return-link {
    text-decoration: none;
  }
`

const PasswordInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--white);
  border-radius: 5px;

  .icon-container {
    padding: 0.4rem;
    cursor: pointer;

    color: var(--grey-dark);

    &:hover {
      color: var(--black);
    }
  }
`

const SubmitButton = styled(Input)`
  background-color: var(--primary);
  color: var(--white);
  font-weight: 600;
  margin: 0 0 1.2rem;

  &.no-margin {
    margin: 0;
  }

  cursor: pointer;

  &:hover {
    background-color: var(--primary-dark);
  }
`

const Button = styled.p`
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  color: var(--primary);
  text-decoration: none;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: 250ms ease-in-out;

  &:hover {
    color: var(--primary-light);
  }
`

export default ForgotPasswordScreen
