import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import Message from "../components/styled-components/Message"
import { flagPost, getPosts, reportPost } from "../actions/postActions"
import PostCard from "../components/PostCard/PostCard"
import WelcomeScreen from "./WelcomeScreen"
import { getUserPlaylists } from "../actions/userActions"
import { Input } from "../components/styled-components/Input"
import { createPlaylist, createPlaylistReset } from "../actions/playlistActions"

const Homepage = () => {
  const dispatch = useDispatch()

  const [option, setOption] = useState("user")
  const [playlistPopUp, setPlaylistPopUp] = useState(false)
  const [addNewPlaylistPopUp, setAddNewPlaylistPopUp] = useState(false)
  const [postId, setPostId] = useState("")

  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [newPlaylistVisibility, setNewPlaylistVisibility] = useState(false)
  const [newPlaylistTags, setNewPlaylistTags] = useState("")
  const [newPlaylistMessage, setNewPlaylistMessage] = useState("")

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postsInfo = useSelector((state) => state.posts)
  const { loading, posts, error } = postsInfo

  const playlistsInfo = useSelector((state) => state.userPlaylists)
  const {
    loading: loadingPlaylists,
    playlists,
    error: errorPlaylists,
  } = playlistsInfo

  const createPlaylistsInfo = useSelector((state) => state.createPlaylist)
  const { loading: loadingPlaylist, error: errorPlaylist } = createPlaylistsInfo

  useEffect(() => {
    if (!posts) {
      dispatch(getPosts(option))
    }
  }, [userInfo, posts, dispatch, option])

  useEffect(() => {
    if (!playlists) {
      dispatch(getUserPlaylists())
    }
  }, [playlists, dispatch])

  const changeRole = (role) => {
    setOption(role)
    dispatch(getPosts(option))
  }

  const flagPostHandler = (id) => {
    dispatch(flagPost(id))
  }

  const reportPostHandler = (id) => {
    dispatch(reportPost(id))
  }

  const popupHandler = (id) => {
    setPostId(id)
    setPlaylistPopUp(true)
  }

  const addToPlaylistHandler = (id) => {
    console.log(id, postId)
  }

  const createPlaylistHandler = async () => {
    if (newPlaylistName.trim().length < 1) {
      setNewPlaylistMessage("Invalid name")
    }

    if (!postId) {
      setNewPlaylistMessage("Invalid post")
    }

    const newPlaylist = {
      name: newPlaylistName,
      posts: postId,
      visibility: newPlaylistVisibility,
      tags: newPlaylistTags,
    }

    dispatch(createPlaylist(newPlaylist))
    dispatch(createPlaylistReset())

    setNewPlaylistName("")
    setNewPlaylistTags("")
    setNewPlaylistVisibility("")
  }

  return userInfo ? (
    <Container>
      {loading && <Message>Loading...</Message>}
      {error && <Message variant="error">{error}</Message>}

      {(userInfo.role === "admin" || userInfo.role === "moderator") && (
        <OptionContainer>
          <Button
            className={option === "user" && "active"}
            onClick={() => changeRole("user")}
          >
            User
          </Button>
          <Button
            className={option === userInfo.role && "active"}
            onClick={() => changeRole(userInfo.role)}
          >
            {userInfo.role}
          </Button>
        </OptionContainer>
      )}

      <PostsContainer>
        {posts ? (
          posts.posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              role={option}
              flagPostHandler={flagPostHandler}
              reportPostHandler={reportPostHandler}
              popupHandler={() => popupHandler(post._id)}
            />
          ))
        ) : (
          <></>
        )}
      </PostsContainer>

      <BackgroundBlock
        hide={!playlistPopUp}
        onClick={() => {
          setPostId("")
          setPlaylistPopUp(false)
          setAddNewPlaylistPopUp(false)
        }}
      >
        <PopUpContainer>
          <PopUp
            hide={addNewPlaylistPopUp}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <p className="heading">Select a Playlist:</p>
            {loadingPlaylists && <Message>Loading...</Message>}
            {errorPlaylists && (
              <Message variant="error">{errorPlaylists}</Message>
            )}
            {playlists && playlists.playlists.length > 0 ? (
              <PlaylistsContainer>
                {playlists?.playlists?.map((playlist) => (
                  <p
                    key={playlist.id}
                    className="playlist"
                    onClick={() => addToPlaylistHandler(playlist.id)}
                  >
                    {playlist.name}
                  </p>
                ))}
              </PlaylistsContainer>
            ) : (
              <p className="no-playlists">No Playlists</p>
            )}
            <Button
              className="variant"
              width="100%"
              onClick={() => setAddNewPlaylistPopUp(true)}
            >
              Add new Playlist
            </Button>
          </PopUp>

          <PopUp
            gap={"0.5rem"}
            hide={!addNewPlaylistPopUp}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <p className="heading">Add a new playlist:</p>
            {loadingPlaylist && <Message variant="info">Loading...</Message>}
            {errorPlaylist && (
              <Message variant="error">{errorPlaylist}</Message>
            )}
            {newPlaylistMessage && (
              <Message variant="error">{newPlaylistMessage}</Message>
            )}
            <Input
              placeholder="Playlist Name"
              value={newPlaylistName}
              width={"100%"}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <Input
              placeholder="Tags"
              value={newPlaylistTags}
              width={"100%"}
              onChange={(e) => setNewPlaylistTags(e.target.value)}
            />
            <Checkbox>
              <p>Visible</p>
              <Input
                checked={newPlaylistVisibility}
                type="checkbox"
                onChange={() =>
                  setNewPlaylistVisibility(!newPlaylistVisibility)
                }
              />
            </Checkbox>
            <Button
              className="primary"
              width="100%"
              onClick={() => createPlaylistHandler()}
            >
              Create
            </Button>
            <Button
              className="variant"
              width="100%"
              onClick={() => setAddNewPlaylistPopUp(false)}
            >
              Back
            </Button>
          </PopUp>
        </PopUpContainer>
      </BackgroundBlock>
    </Container>
  ) : (
    <div className="welcome-container">
      <WelcomeScreen />
    </div>
  )
}

const Container = styled.section`
  padding: 1rem 2rem 80px;
`

const OptionContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const Button = styled.p`
  flex: 1;
  text-align: center;
  padding: 0.5rem 1rem;
  border: 3px solid var(--secondary);
  color: var(--secondary);
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 200ms ease-in-out;
  margin-top: 1rem;
  text-transform: capitalize;

  &.active {
    background-color: var(--secondary);
    color: var(--light);
  }

  &:hover {
    background-color: var(--secondary);
    color: var(--light);
  }

  width: ${(props) => (props.width ? props.width : "")};

  &.primary {
    flex: 0;
    margin: 0;
    background-color: var(--primary-dark);
    color: var(--secondary);
    border: 2px solid var(--primary-dark);
  }

  &.primary:hover {
    color: var(--light);
  }

  &.variant {
    flex: 0;
    margin: 0;
    background-color: transparent;
    color: var(--primary-dark);
    border: 2px solid var(--primary-dark);
  }

  &.variant:hover {
    background-color: var(--primary-dark);
    border: 2px solid var(--primary-dark);
    color: var(--secondary);
  }
`

const PostsContainer = styled.div`
  padding: 1rem 0;
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

const PopUp = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
  background: var(--secondary-dark);
  min-width: 300px;
  min-height: 230px;
  max-height: 400px;
  color: var(--light);

  justify-content: center;
  align-items: center;
  padding: 1rem 2rem 2rem;
  flex-direction: column;
  border-radius: 5px;

  gap: ${(props) => (props.gap ? props.gap : "")};

  .heading {
    text-align: left;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .no-playlists {
    color: var(--light);
    padding-bottom: 1rem;
  }
`

const PlaylistsContainer = styled.div`
  overflow-y: auto;
  width: 100%;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 1rem 0;

  .playlist {
    background: var(--secondary-light);
    border-radius: 5px;
    padding: 0.5rem 0;
    width: 100%;
  }
`
const Checkbox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 0.5rem 0.5rem;
`
export default Homepage
