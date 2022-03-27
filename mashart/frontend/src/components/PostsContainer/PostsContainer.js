import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { flagPost, likePost, reportPost } from "../../actions/postActions"
import {
  addPostToPlaylist,
  createPlaylist,
  createPlaylistReset,
} from "../../actions/playlistActions"

import { getUserPlaylists } from "../../actions/userActions"

import PostCard from "../PostCard/PostCard"
import Message from "../styled-components/Message"
import { Input } from "../styled-components/Input"
import device from "../../screen_sizes/devices"

const PostsContainer = ({ posts, option = "user" }) => {
  const dispatch = useDispatch()

  const [playlistPopUp, setPlaylistPopUp] = useState(false)
  const [addNewPlaylistPopUp, setAddNewPlaylistPopUp] = useState(false)
  const [postId, setPostId] = useState("")

  const [readerPopUp, setReaderPopUp] = useState(false)
  const [comic, setComic] = useState(null)

  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [newPlaylistVisibility, setNewPlaylistVisibility] = useState(false)
  const [newPlaylistTags, setNewPlaylistTags] = useState("")
  const [newPlaylistMessage, setNewPlaylistMessage] = useState("")

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const playlistsInfo = useSelector((state) => state.userPlaylists)
  const {
    loading: loadingPlaylists,
    playlists,
    error: errorPlaylists,
  } = playlistsInfo

  const createPlaylistsInfo = useSelector((state) => state.createPlaylist)
  const { loading: loadingPlaylist, error: errorPlaylist } = createPlaylistsInfo

  const addPostToPlaylistInfo = useSelector((state) => state.addPostToPlaylist)
  const { loading: loadingAddPostPlaylist, error: errorAddPostPlaylist } =
    addPostToPlaylistInfo

  const flagPostHandler = (id) => {
    dispatch(flagPost(id))
  }

  const likePostHandler = (id) => {
    dispatch(likePost(id))
  }

  const reportPostHandler = (id) => {
    dispatch(reportPost(id))
  }

  const popupHandler = (id) => {
    setPostId(id)
    setPlaylistPopUp(true)
  }

  const comicReaderPopupHandler = (title, path) => {
    setReaderPopUp(true)
    setComic({ title, path })
  }

  const addToPlaylistHandler = (id) => {
    dispatch(addPostToPlaylist(id, postId))
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

  useEffect(() => {
    if (!playlists) {
      dispatch(getUserPlaylists())
    }
  }, [playlists, dispatch])

  return (
    <Container>
      <Posts>
        {posts ? (
          posts?.posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              role={option}
              flagPostHandler={flagPostHandler}
              reportPostHandler={reportPostHandler}
              likePostHandler={likePostHandler}
              comicReaderPopupHandler={comicReaderPopupHandler}
              popupHandler={() => popupHandler(post._id)}
              userId={userInfo._id}
            />
          ))
        ) : (
          <></>
        )}
      </Posts>

      <BackgroundBlock
        hide={!playlistPopUp && !readerPopUp}
        onClick={() => {
          setPostId("")
          setComic(null)
          setReaderPopUp(false)
          setPlaylistPopUp(false)
          setAddNewPlaylistPopUp(false)
        }}
      >
        <PopUpContainer>
          <PlaylistPopUpContainer hide={readerPopUp}>
            <PopUp
              hide={addNewPlaylistPopUp}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <p className="heading">Select a Bookmark:</p>
              {(loadingPlaylists || loadingAddPostPlaylist) && (
                <Message>Loading...</Message>
              )}
              {errorPlaylists && (
                <Message variant="error">{errorPlaylists}</Message>
              )}
              {errorAddPostPlaylist && (
                <Message variant="error">{errorAddPostPlaylist}</Message>
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
                <p className="no-playlists">No Bookmarks</p>
              )}
              <Button
                className="variant"
                width="100%"
                onClick={() => setAddNewPlaylistPopUp(true)}
              >
                Add new Bookmark
              </Button>
            </PopUp>

            <PopUp
              gap={"0.5rem"}
              hide={!addNewPlaylistPopUp}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <p className="heading">Add a new bookmark:</p>
              {loadingPlaylist && <Message variant="info">Loading...</Message>}
              {errorPlaylist && (
                <Message variant="error">{errorPlaylist}</Message>
              )}
              {newPlaylistMessage && (
                <Message variant="error">{newPlaylistMessage}</Message>
              )}
              <Input
                placeholder="Bookmark Name"
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
          </PlaylistPopUpContainer>

          <ComicReaderPopUpContainer
            hide={playlistPopUp || addNewPlaylistPopUp}
          >
            <ReaderPopUp
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              {comic && comic.path.length > 0 ? (
                <>
                  <p className="heading">{comic.title}</p>
                  <ComicContainer>
                    {comic.path.map((page, index) => (
                      <ImageContainer key={index}>
                        <img className="post" src={page} alt="page" />
                      </ImageContainer>
                    ))}
                  </ComicContainer>
                </>
              ) : (
                <p className="no-posts">No Comic Selected</p>
              )}
            </ReaderPopUp>
          </ComicReaderPopUpContainer>
        </PopUpContainer>
      </BackgroundBlock>
    </Container>
  )
}

const Container = styled.div``

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

const Posts = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 1rem 0;

  justify-content: center;
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

const PlaylistPopUpContainer = styled.div`
  display: ${(props) => (props.hide ? "none" : "")};
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

const ReaderPopUp = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
  background: var(--dark);
  min-height: 230px;
  max-height: 300px;

  color: var(--light);

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

  @media ${device.tablet} {
    max-height: 400px;
  }
`

const PlaylistsContainer = styled.div`
  overflow-y: auto;
  overscroll-behavior: contain;
  width: 100%;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 1rem 0.5rem;

  .playlist {
    background: var(--secondary-light);
    border-radius: 5px;
    padding: 0.5rem 0;
    width: 100%;
    cursor: pointer;
  }

  .playlist:hover {
    background: var(--secondary);
  }
`

const ComicReaderPopUpContainer = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
`

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--grey-light);

  .post {
    width: 300px;
    height: 300px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  @media ${device.tablet} {
    .post {
      width: 600px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
`

const ComicContainer = styled.div`
  overflow: auto;
  overscroll-behavior: contain;
  padding: 1rem 0.5rem;
`

const Checkbox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 0.5rem 0.5rem;
`

export default PostsContainer
