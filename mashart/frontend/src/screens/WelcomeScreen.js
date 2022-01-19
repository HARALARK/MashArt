import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import Design from "../components/Design"
import device from "../screen_sizes/devices"

const WelcomeScreen = () => {
  return (
    <Hero>
      <Container>
        <Left>
          <h1 className="welcome">Welcome to</h1>
          <h2 className="mashart">MashArt</h2>
          <p className="para">
            Est et duis pariatur deserunt esse eu est ut velit dolore eu elit
            esse quis. Quis occaecat consequat non amet est magna sint dolore
            eiusmod cupidatat quis fugiat veniam nulla.Quis occaecat consequat
            non amet est magna sint dolore eiusmod cupidatat quis fugiat veniam
            nulla.
          </p>
          <div className="button-container">
            <Link to="/signup">
              <Button primary>Sign Up</Button>
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </Left>
        <Design />
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

  width: 100%;

  height: 100vh;

  @media ${device.tablet} {
    flex-direction: row;
    height: calc(100vh - 80px);
    justify-content: space-between;
    gap: 2rem;
  }
`

const Left = styled.div`
  text-align: center;
  .welcome {
    color: var(--grey-dark);
    font-weight: 700;
    font-size: 2.5rem;
    font-family: "Emblema One", cursive;
  }

  .mashart {
    color: var(--primary);
    font-weight: 600;
    font-size: 2rem;
    letter-spacing: 2px;
    line-height: 0.5;
  }

  .para {
    font-size: 0.9rem;
    margin: 1rem;
    line-height: 92%;
    max-width: 400px;
  }

  .button-container {
    text-align: center;
  }

  @media ${device.tablet} {
    text-align: left;

    .button-container {
      text-align: left;
    }

    .para {
      text-align: justify;
      margin: 1rem 0;
    }
  }
`

const Button = styled.p`
  display: inline-block;
  width: 100px;
  text-align: center;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) =>
    props.primary ? "var(--secondary)" : "transparent"};
  border: 3px solid var(--secondary);
  color: ${(props) =>
    props.primary ? "var(--background)" : "var(--secondary)"};
  text-decoration: none;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: 250ms ease-in-out;

  &:hover {
    background-color: transparent;
    border: 3px solid transparent;
    border-bottom: 3px solid var(--secondary);
    border-radius: 0;
    color: var(--secondary);
  }
`

export default WelcomeScreen
