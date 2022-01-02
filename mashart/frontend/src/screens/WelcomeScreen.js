import React from "react"
import styled from "styled-components"
import device from "../screen_sizes/devices"

const WelcomeScreen = () => {
  return (
    <Container>
      <Left>
        <h1 className="welcome">Welcome to</h1>
        <h2 className="mashart">MashArt</h2>
        <p className="para">
          Est et duis pariatur deserunt esse eu est ut velit dolore eu elit esse
          quis. Quis occaecat consequat non amet est magna sint dolore eiusmod
          cupidatat quis fugiat veniam nulla. In dolore est labore consequat
          adipisicing cupidatat ad velit et dolor fugiat nisi irure. In proident
          culpa do Lorem tempor deserunt dolor aute velit do. Dolor ea proident
          culpa labore.
        </p>
        <div className="button-container">
          <Button primary>Sign Up</Button>
          <Button>Login</Button>
        </div>
      </Left>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1.2rem;

  @media ${device.tablet} {
    flex-direction: row;
  }
`

const Left = styled.div`
  text-align: center;
  .welcome {
    color: #2f2e41;
    font-weight: 700;
    font-size: 2.5rem;
    font-family: "Emblema One", cursive;
  }

  .mashart {
    color: #dd4a5c;
    font-weight: 600;
    font-size: 2rem;
    letter-spacing: 2px;
    line-height: 0.5;
    margin-bottom: 2rem;
  }

  .para {
    text-align: justify;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .button-container {
    text-align: left;
  }
`

const Right = styled.div``

const Button = styled.a`
  display: inline-block;
  width: 100px;
  text-align: center;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.primary ? "#24003e" : "#ffb500")};
  border: 3px solid #24003e;
  color: ${(props) => (props.primary ? "#ffb500" : "#24003e")};
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: 250ms ease-in-out;

  &:hover {
    background-color: #ffb500;
    border: 3px solid #ffb500;
    border-bottom: 3px solid #24003e;
    border-radius: 0;
    color: #24003e;
  }
`

export default WelcomeScreen
