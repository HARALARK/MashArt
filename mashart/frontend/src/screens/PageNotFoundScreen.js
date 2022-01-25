import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import device from "../screen_sizes/devices"

const PageNotFoundScreen = () => {
  return (
    <Container>
      <Box>
        <h1 className="title">404</h1>
        <p className="para">
          Something went
          <span> wrong!</span>
        </p>
        <Link className="homepage-link" to="/">
          <Button>Back to HomePage</Button>
        </Link>
      </Box>
    </Container>
  )
}

const Container = styled.section`
  padding: 1rem 2rem;
  height: 100%;
`

const Box = styled.section`
  color: var(--secondary);
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  .title {
    font-size: 10rem;
    line-height: 80%;
  }
  .para {
    font-size: 1.8rem;
  }

  .para span {
    font-weight: 700;
  }

  .homepage-link {
    text-decoration: none;
  }

  @media ${device.tablet} {
    .title {
      font-size: 20rem;
    }
    .para {
      font-size: 2rem;
    }

    .para span {
      font-weight: 700;
    }
  }
`

const Button = styled.p`
  text-align: center;
  padding: 0.5rem 1rem;
  border: 3px solid var(--secondary);
  color: var(--secondary);
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 100ms ease-in-out;
  margin-top: 1rem;

  &:hover {
    background-color: var(--secondary);
    color: var(--light);
  }

  @media ${device.tablet} {
    margin-top: 1.5rem;
  }
`

export default PageNotFoundScreen
