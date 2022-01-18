import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { login } from "../actions/userActions"
import Design from "../components/Design"
import { Input, PasswordInput } from "../components/styled-components/Input"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

const LoginScreen = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo, error } = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <Hero>
      <Container>
        <div className="design-container">
          <Design />
        </div>
        <div className="form-container">
          <Form>
            <p className="heading">Login</p>
            {loading && <Message>Loading...</Message>}
            {error && <Message variant="error">{error}</Message>}

            <Input
              type="text"
              placeholder="Username*"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

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
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password
              </Link>
            </div>

            <SubmitButton type="button" value="Login" onClick={submitHandler} />
            <p className="signup-container">
              Don't have an account?{" "}
              <span>
                <Link
                  className="signup-link"
                  to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
                >
                  Sign Up
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

  height: calc(100vh - 80px);

  .design-container {
    display: none;
  }

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

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .signup-container {
    color: var(--white);
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .signup-link {
    color: var(--primary);
  }

  .forgot-password {
    display: inline-block;
    text-align: right;
    width: 100%;
    font-size: 0.8rem;
    color: var(--primary);
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
  margin: 0rem 0 0rem;

  cursor: pointer;

  &:hover {
    background-color: var(--primary-dark);
  }
`

export default LoginScreen
