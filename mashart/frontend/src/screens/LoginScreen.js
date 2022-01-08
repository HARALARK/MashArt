import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { login } from "../actions/userActions"
import Design from "../components/Design"
import Input from "../components/styled-components/Input"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"

const LoginScreen = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
            <Input
              type="password"
              placeholder="Password*"
              onChange={(e) => setPassword(e.target.value)}
            />
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
    color: #fff;
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
  background-color: #2f2e41;
  padding: 1rem 2rem;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .signup-container {
    color: #fff;
    text-align: center;
    margin-bottom: 1rem;
  }

  .signup-link {
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

export default LoginScreen
