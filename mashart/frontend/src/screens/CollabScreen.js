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

  const createRoomHandler = () => {
    /**
     * TODO: Complete functionality of Create Room
     * 1. dispatch request to create a Room
     * 2. redirect the user to collab screen with room id
     */
  }

  const joinRoomHandler = () => {
    /**
     * TODO: Complete functionality of Create Room
     * 1. dispatch request to check if room exists using the roomCode
     * 2. redirect the user to collab screen with room id
     */
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
  }, [userInfo, navigate])

  return (
    <Container>
      <GameInfo />
      <Form>
        <p className="heading">Collaborate!</p>
        {loading && <Message>Loading...</Message>}
        {error && <Message variant="error">{error}</Message>}

        <Button className="create-room" onClick={createRoomHandler}>
          Create Room
        </Button>

        <Input
          type="text"
          placeholder="Room Code"
          onChange={(e) => setRoomCode(e.target.value)}
        />

        <Button className="join-room" onClick={joinRoomHandler}>
          Join Room
        </Button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding: 1rem 2rem 100px;

  align-items: center;
  justify-content: center;

  .heading {
    color: var(--light);
    font-size: 2rem;
    text-align: center;
  }

  @media ${device.tablet} {
    height: calc(100vh - 160px);
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
  width: 100%;
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
