import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"
import { Input } from "../components/styled-components/Input"
import GameInfo from "../components/GameInfo"
import { useNavigate } from "react-router-dom"

const CollabScreen = () => {
  const navigate = useNavigate()
  const [roomCode, setRoomCode] = useState("")

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo, error } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
  }, [userInfo, navigate])

  return (
    <Container>
      <GameInfo />
      <div>
        <Form>
          <p className="heading">Collaborate!</p>
          {loading && <Message>Loading...</Message>}
          {error && <Message variant="error">{error}</Message>}

          <Button className="create-room">Create Room</Button>

          <Input
            type="text"
            placeholder="Room Code"
            onChange={(e) => setRoomCode(e.target.value)}
          />

          <Button className="join-room">Join Room</Button>
        </Form>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  align-items: center;
  justify-content: center;
  height: calc(100vh - 160px);

  .heading {
    color: var(--light);
    font-size: 2rem;
    text-align: center;
  }

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 2rem;
  }
`

const Form = styled.form`
  background-color: var(--secondary);
  padding: 1rem 2rem 2rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 390px;
`

const Button = styled.p`
  text-align: center;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 100ms ease-in-out;

  &.create-room {
    margin: 1rem 0 4rem;
    background-color: var(--primary-dark);
    color: var(--secondary);
    border: 2px solid var(--primary-dark);
  }

  &.create-room:hover {
    color: var(--light);
  }

  &.join-room {
    margin-top: 0.5rem;
    background-color: transparent;
    color: var(--primary-dark);
    border: 2px solid var(--primary-dark);
  }

  &.join-room:hover {
    background-color: var(--primary-dark);
    border: 2px solid var(--primary-dark);
    color: var(--secondary);
  }
`
export default CollabScreen
