import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"
import { Input } from "../components/styled-components/Input"
import GameInfo from "../components/GameInfo"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getUserPosts } from "../actions/userActions"
import { createCollab, joinCollab } from "../actions/collabActions"

const CollabScreen = () => {
  const navigate = useNavigate()
  const [roomCode, setRoomCode] = useState("")
  const [message, setMessage] = useState("")
  const [createRoomPopUp, setCreateRoomPopUp] = useState(false)
  const [postsPopUp, setPostsPopUp] = useState(false)
  const [content, setContent] = useState("")

  const dispatch = useDispatch()

  const userPosts = useSelector((state) => state.userPosts)
  const { loading: postsLoading, posts, error: postsError } = userPosts

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const collabInfo = useSelector((state) => state.collab)
  const { loading, collab, error } = collabInfo

  const createRoomHandler = (path = "") => {
    dispatch(createCollab(path))
    setContent(path)
  }

  const joinRoomHandler = () => {
    if (roomCode.length !== 6 || roomCode.trim() === "") {
      setMessage("Please enter a valid room code")
    } else {
      dispatch(joinCollab(roomCode))
    }
  }

  const postsHandler = () => {
    setPostsPopUp(true)
    dispatch(getUserPosts())
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
    if (collab) {
      navigate("/collab/room", { state: { content } })
    }
  }, [userInfo, navigate, collab, content])

  return (
    <Container>
      <BackgroundBlock
        hide={!createRoomPopUp}
        onClick={() => {
          setCreateRoomPopUp(false)
          setPostsPopUp(false)
        }}
      >
        <PopUpContainer>
          <PopUp
            hide={postsPopUp}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <p className="heading">Select an option:</p>
            <Button
              className="primary"
              width="100%"
              onClick={() => createRoomHandler("")}
            >
              Blank Canvas
            </Button>
            <Button className="variant" width="100%" onClick={postsHandler}>
              Post
            </Button>
          </PopUp>

          <PopUp
            hide={!postsPopUp}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <p className="heading">Select a Post:</p>
            {postsLoading && <Message>Loading...</Message>}
            {postsError && <Message variant="error">{postsError}</Message>}

            {posts && posts.posts.length > 0 ? (
              <PostsContainer>
                {posts.posts.map((post) => (
                  <ImageContainer
                    key={post._id}
                    onClick={() => createRoomHandler(post.path[0])}
                  >
                    <img
                      key={post.id}
                      className="post"
                      src={post.path[0]}
                      alt="post"
                    />
                  </ImageContainer>
                ))}
              </PostsContainer>
            ) : (
              <p className="no-posts">No Posts</p>
            )}
            <Button
              className="variant"
              width="100%"
              onClick={() => setPostsPopUp(false)}
            >
              Back
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
          onClick={() => {
            setCreateRoomPopUp(true)
          }}
        >
          Create Room
        </Button>

        <Input
          type="text"
          placeholder="Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
        />

        <Button className="variant" onClick={joinRoomHandler}>
          Join Room
        </Button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  overflow: none;
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
  position: fixed;
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

const PostsContainer = styled.div`
  overflow: auto;
  width: 400px;
`

const ImageContainer = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  background: var(--grey-light);

  .post {
    height: 300px;
    width: 300px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`

const PopUp = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
  background: var(--secondary-dark);
  min-width: 300px;
  min-height: 230px;
  max-height: 400px;

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

  .no-posts {
    color: var(--light);
    padding-bottom: 1rem;
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
