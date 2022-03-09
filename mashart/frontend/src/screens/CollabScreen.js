import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"
import { Input } from "../components/styled-components/Input"
import GameInfo from "../components/GameInfo"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

const CollabScreen = () => {
  const navigate = useNavigate()
  const [roomCode, setRoomCode] = useState("")
  const [message, setMessage] = useState("")
  const [createRoomPopUp, setCreateRoomPopUp] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo, error } = userLogin

  const createRoomHandler = (type) => {
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

    if (roomCode.length !== 6 || roomCode.trim() === "") {
      setMessage("Please enter a valid room code")
    }
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
  }, [userInfo, navigate])

  return (
    <Container>
      <BackgroundBlock
        hide={!createRoomPopUp}
        onClick={() => {
          setCreateRoomPopUp(false)
        }}
      >
        <PopUpContainer>
          <PopUp
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <p className="heading">Select an option:</p>
            <Button
              className="primary"
              width="100%"
              onClick={createRoomHandler("blank")}
            >
              Blank Canvas
            </Button>
            <Button
              className="variant"
              width="100%"
              onClick={createRoomHandler("post")}
            >
              Post
            </Button>
          </PopUp>
        </PopUpContainer>
      </BackgroundBlock>
      <GameInfo />
      <Form>
        <p className="heading">Collaborate!</p>
        {loading && <Message>Loading...</Message>}
        {error && <Message variant="error">{error}</Message>}
        {message && <Message variant="warning">{message}</Message>}

        <Button
          className="primary"
          margin="1rem 0 4rem"
          onClick={() => setCreateRoomPopUp(true)}
        >
          Create Room
        </Button>

        <Input
          type="text"
          placeholder="Room Code"
          onChange={(e) => setRoomCode(e.target.value)}
        />

        <Button className="variant" onClick={joinRoomHandler}>
          Join Room
        </Button>

        <Link className="link" to="/edit-art">
          <Button>Edit Art Profile</Button>
        </Link>
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

const BackgroundBlock = styled.div`
  display: ${(props) => (props.hide ? "none" : "")};
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(77, 90, 135, 0.8);
  width: 100%;
  height: 100%;
`

const PopUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const PopUp = styled.form`
  background: var(--secondary-dark);
  width: 300px;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem 2rem;
  flex-direction: column;
  border-radius: 5px;

  .heading {
    text-align: left;
    font-size: 1.5rem;
    margin-bottom: 1rem;
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

  width: ${(props) => (props.width ? props.width : "")};

  &.primary {
    margin: ${(props) => (props.margin ? props.margin : "")};
    background-color: var(--primary-dark);
    color: var(--secondary);
    border: 2px solid var(--primary-dark);
  }

  &.primary:hover {
    color: var(--light);
  }

  &.variant {
    margin-top: 0.5rem;
    background-color: transparent;
    color: var(--primary-dark);
    border: 2px solid var(--primary-dark);
  }

  &.variant:hover {
    background-color: var(--primary-dark);
    border: 2px solid var(--primary-dark);
    color: var(--secondary);
  }

  &.edit-art {
    margin-top: 0.5rem;
    background-color: transparent;
    color: var(--primary-dark);
    border: 2px solid var(--primary-dark);
  }

  &.edit-art:hover {
    color: var(--light);
  }
`
export default CollabScreen
