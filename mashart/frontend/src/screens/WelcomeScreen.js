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
          cupidatat quis fugiat veniam nulla.Quis occaecat consequat non amet
          est magna sint dolore eiusmod cupidatat quis fugiat veniam nulla.
        </p>
        <div className="button-container">
          <Button primary>Sign Up</Button>
          <Button>Login</Button>
        </div>
      </Left>
      <Right>
        <div className="container">
          <SVG src="./images/blob.svg" alt="blob" boxSize="320" />
          <SVG
            className="collab"
            src="./images/collab.svg"
            alt="collab"
            boxSize="250"
          />
          <div className="text-design">
            <p className="collaborate">Collaborate</p>
            <p className="share">Share</p>
            <p className="enjoy">Enjoy!!!</p>
          </div>
        </div>
      </Right>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  margin: 0 1.2rem;

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
  }

  .para {
    font-size: 0.9rem;
    margin: 1rem;
    line-height: 92%;
  }

  .button-container {
    text-align: center;
  }

  @media ${device.tablet} {
    width: 400px;
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

const Right = styled.div`
  .container {
    position: relative;
  }
  .collab {
    position: absolute;
    left: 0;
  }

  .text-design {
    position: absolute;
    top: 60%;
    font-weight: 900;
    font-size: 2rem;
    line-height: 65%;
    letter-spacing: -2px;
  }

  .text-design .collaborate {
    color: #ffffff;
  }

  .text-design .share {
    color: #7c41a7;
  }

  .text-design .enjoy {
    color: #dd4a5c;
  }

  @media ${device.tablet} {
    .text-design {
      font-size: 2.35rem;
    }
  }
`

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

const SVG = styled.img`
  height: ${(props) => props.boxSize || props.height}px;
  width: ${(props) => props.boxSize || props.width}px;
  color: ${(props) => props.color || "#DD4A5C"};

  @media ${device.tablet} {
    height: ${(props) => (props.boxSize || props.height) * 1.2}px;
    width: ${(props) => (props.boxSize || props.width) * 1.2}px;
  }
`

export default WelcomeScreen
