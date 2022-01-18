import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { forgotPassword } from "../actions/userActions"
import Design from "../components/Design"
import { Input } from "../components/styled-components/Input"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("")

  const dispatch = useDispatch()

  const forgotPasswordInfo = useSelector((state) => state.forgotPassword)
  const { loading, success, error } = forgotPasswordInfo

  console.log(forgotPasswordInfo)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
    setEmail("")
  }

  return (
    <Hero>
      <Container>
        <div className="design-container">
          <Design />
        </div>
        <div className="form-container">
          <Form>
            <p className="heading">Forgot Password</p>
            {loading && <Message>Loading...</Message>}
            {error && <Message variant="error">{error}</Message>}
            {success && <Message variant="success">{success.message}</Message>}

            <Input
              type="text"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <SubmitButton
              type="button"
              value="Send Email"
              onClick={submitHandler}
            />
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

  .design-container {
    display: none;
  }

  .heading {
    color: var(--light);
    font-size: 1.5rem;
    text-align: center;
  }

  @media ${device.laptop} {
    flex-direction: row;
    height: calc(100vh - 80px);
    justify-content: space-between;
    gap: 2rem;
    padding: 0 2rem;

    .design-container {
      display: inline-block;
    }
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

  .forgot-password {
    display: inline-block;
    text-align: right;
    width: 100%;
    font-size: 0.8rem;
    color: var(--primary);
  }
`

const SubmitButton = styled(Input)`
  background-color: var(--primary);
  color: var(--light);
  font-weight: 600;
  margin: 0 0 1.2rem;

  cursor: pointer;

  &:hover {
    background-color: var(--primary-dark);
  }
`

export default ForgotPasswordScreen
