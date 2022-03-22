import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getPlaylist } from "../actions/playlistActions"
import { getUserDetails } from "../actions/userActions"
import Message from "../components/styled-components/Message"

const PlaylistScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [playlistPopUp, setPlaylistPopUp] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const playlistInfo = useSelector((state) => state.getPlaylist)
  const { loading, playlist, error } = playlistInfo

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }

    if (!userDetails) {
      dispatch(getUserDetails("profile"))
    }
  }, [userInfo, navigate, userDetails, dispatch])

  const playlistHandler = (id) => {
    dispatch(getPlaylist(id))
    setPlaylistPopUp(true)
  }

  return (
    <Container>
      <h3 className="heading">Bookmarks</h3>
      <PlaylistsContainer>
        {user && user?.playlists?.length > 0 ? (
          <>
            {user?.playlists?.map((playlist) => (
              <Playlist
                key={playlist.id}
                onClick={() => playlistHandler(playlist.id)}
              >
                <p className="name">{playlist.name}</p>
              </Playlist>
            ))}
          </>
        ) : (
          <p className="no-playlists">No Bookmarks...</p>
        )}
      </PlaylistsContainer>

      <BackgroundBlock
        hide={!playlistPopUp}
        onClick={() => {
          setPlaylistPopUp(false)
        }}
      >
        <PopUpContainer>
          <PopUp
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {loading && <Message>Loading...</Message>}
            {error && <Message variant="error">{error}</Message>}
            {playlist && playlist?.content?.length > 0 ? (
              <>
                <p className="heading" light>
                  {playlist.name}
                </p>
                <PlaylistPostContainer>
                  {playlist?.content?.map((content) => (
                    <PostImg key={content._id} src={content.path} />
                  ))}
                </PlaylistPostContainer>
              </>
            ) : (
              <p className="no-playlists">No Bookmarks</p>
            )}
          </PopUp>
        </PopUpContainer>
      </BackgroundBlock>
    </Container>
  )
}

const Container = styled.section`
  padding: 1rem 2rem 80px;

  .heading {
    font-size: 2rem;
    font-weight: 400;
    color: var(--dark);
    border-bottom: solid 2px var(--dark);
  }

  .no-playlists {
    font-size: 1.5rem;
    color: var(--secondary);
  }
`

const PlaylistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
`
const Playlist = styled.div`
  background: var(--secondary);
  color: var(--light);
  padding: 0.8rem;
  width: 100px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  transition: 100ms ease-in-out;

  &:hover {
    background: var(--secondary-dark);
  }

  .name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
  color: var(--light);
`

const PopUp = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
  background: var(--secondary-light);
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
    font-size: 1.2rem;
    color: var(--light);
    border-bottom: solid 2px var(--light);
    margin-bottom: 1rem;
  }

  .no-playlists {
    color: var(--light);
    padding-bottom: 1rem;
  }
`

const PlaylistPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 0.5rem;
  padding: 0 0.5rem;
`

const PostImg = styled.img`
  height: 300px;
  width: 300px;
`

export default PlaylistScreen
