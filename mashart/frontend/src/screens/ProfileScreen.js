import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import {
  blockUser,
  changeRole,
  followUser,
  getblockedUsers,
  getUserDetails,
  unblockUser,
  unfollowUser,
} from "../actions/userActions"
import Message from "../components/styled-components/Message"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import device from "../screen_sizes/devices"
import Tabs from "../components/TabComponent/Tabs"
import PostCard from "../components/PostCard/PostCard"
import { getPost } from "../actions/postActions"

const ProfileScreen = () => {
  const { id } = useParams()

  const [postPopUp, setPostPopUp] = useState(false)

  const [readerPopUp, setReaderPopUp] = useState(false)
  const [comic, setComic] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user, error } = userDetails

  const getPostInfo = useSelector((state) => state.getPost)
  const { loading: postLoading, post, error: postError } = getPostInfo

  const getBlockedUsers = useSelector((state) => state.blockedUsers)
  const { blockedUsers } = getBlockedUsers

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    } else {
      if (id === userInfo._id) {
        navigate("/profile")
      } else if (id && (id !== user?._id || !user?.username)) {
        dispatch(getUserDetails(`profile?_id=${id}`))
        dispatch(getblockedUsers())
      } else if (id === undefined) {
        if (!user?.username || user?._id !== userInfo._id) {
          dispatch(getUserDetails("profile"))
        }
      }
    }
  }, [userInfo, navigate, user, dispatch, id])

  const followHandler = () => {
    dispatch(followUser(user._id))
  }
  const unfollowHandler = () => {
    dispatch(unfollowUser(user._id))
  }

  const blockHandler = () => {
    dispatch(blockUser(user._id))
  }
  const unblockHandler = () => {
    dispatch(unblockUser(user._id))
  }

  const changeRoleHandler = () => {
    dispatch(changeRole(user._id))
  }

  const popupHandler = (id) => {
    dispatch(getPost(id))
    setReaderPopUp(false)
    setPostPopUp(true)
  }

  const comicReaderPopupHandler = (title, path) => {
    setComic({ title, path })
    setPostPopUp(false)
    setReaderPopUp(true)
  }

  return (
    <Container>
      {loading && <Message>Loading...</Message>}
      {error && <Message variant="error">{error}</Message>}
      {user && (
        <>
          <InfoSection>
            <InfoContainer>
              <ProfileHolder>
                <ProfileImageHolder>
                  {user.profileImage && user.profileImage.imageSrc ? (
                    <ProfileImage
                      src={user.profileImage.imageSrc}
                      alt="profile"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} size="3x" />
                  )}
                </ProfileImageHolder>
                <ProfileUsername>{user.username}</ProfileUsername>
              </ProfileHolder>
              <MiscHolder>
                <MiscInfo>
                  <p className="title">Posts</p>
                  <p>{user.posts?.length}</p>
                </MiscInfo>

                <MiscInfo>
                  <p className="title">Followers</p>
                  <p>{user.followers?.length}</p>
                </MiscInfo>

                <MiscInfo>
                  <p className="title">Following</p>
                  <p>{user.following?.length}</p>
                </MiscInfo>
              </MiscHolder>
            </InfoContainer>
            <ButtonContainer>
              {id ? (
                <>
                  {user.followers?.includes(userInfo._id) ? (
                    <Button onClick={unfollowHandler}>unFollow</Button>
                  ) : (
                    <Button variant="primary" onClick={followHandler}>
                      Follow
                    </Button>
                  )}
                  {blockedUsers?.blockedUsers.includes(user._id) ? (
                    <Button onClick={unblockHandler}>unBlock</Button>
                  ) : (
                    <Button onClick={blockHandler}>Block</Button>
                  )}

                  {userInfo.role === "admin" && (
                    <Button onClick={changeRoleHandler}>
                      To {user.role === "user" ? "moderator" : "user"}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Link className="link" to="/playlist">
                    <Button variant="primary">Bookmarks</Button>
                  </Link>
                  <Link className="link" to="/edit-profile">
                    <Button>Edit Profile</Button>
                  </Link>
                </>
              )}
            </ButtonContainer>
          </InfoSection>
          <Tabs posts={user?.posts} popupHandler={popupHandler} />
        </>
      )}

      <BackgroundBlock
        hide={!postPopUp && !readerPopUp}
        onClick={() => {
          setReaderPopUp(false)
          setPostPopUp(false)
        }}
      >
        <PopUpContainer>
          <PostPopUp hide={readerPopUp}>
            <PopUp
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              {postLoading && <Message>Loading...</Message>}
              {postError && <Message variant="error">{postError}</Message>}
              {post && (
                <PostCard
                  post={post}
                  flagPostHandler={() => {}}
                  reportPostHandler={() => {}}
                  likePostHandler={() => {}}
                  comicReaderPopupHandler={comicReaderPopupHandler}
                  popupHandler={() => {}}
                  userId={userInfo._id}
                  noaction={true}
                  setPostPopUp={setPostPopUp}
                />
              )}
            </PopUp>
          </PostPopUp>

          {console.log(postPopUp, readerPopUp)}

          <ComicReaderPopUpContainer hide={postPopUp}>
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

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0 0;
  color: var(--secondary-dark);

  @media ${device.tablet} {
    padding: 1rem 2rem 100px;
  }
`

const InfoSection = styled.section`
  padding: 1rem 0 1rem;
  width: calc(100% - 2rem);
  border-bottom: 2px solid var(--background-dark);
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  .link {
    flex: 1;
    text-decoration: none;
  }
`

const Button = styled.p`
  flex: 1;
  text-align: center;
  padding: 0.5rem 1rem;
  border: 3px solid var(--secondary);
  color: ${(props) =>
    props.variant === "primary" ? "var(--light)" : "var(--secondary)"};
  background: ${(props) =>
    props.variant === "primary" ? "var(--secondary)" : ""};
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 100ms ease-in-out;

  text-transform: capitalize;

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary"
        ? "var(--secondary-dark)"
        : "var(--secondary)"};
    border: 3px solid
      ${(props) =>
        props.variant === "primary"
          ? "var(--secondary-dark)"
          : "var(--secondary)"};
    color: var(--light);
  }
`

const InfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ProfileHolder = styled.div`
  margin-bottom: 0.5rem;
`

const ProfileImage = styled.img`
  height: 80px;
  width: 80px;
`

const ProfileImageHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height || "80px"};
  width: ${(props) => props.width || "80px"};
  background-color: ${(props) => props.background || "var(--light)"};
  border-radius: 10px;
`

const ProfileUsername = styled.p`
  text-align: center;
  padding-top: 0.3rem;
  font-weight: 600;
`

const MiscHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1rem;
  gap: 1rem;
  width: 100%;
  @media ${device.tablet} {
    padding: 0;
    flex-direction: row;
  }
`

const MiscInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  font-size: 1.1rem;

  & .title {
    font-weight: 500;
  }

  @media ${device.tablet} {
    width: 150px;
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

const PopUp = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};

  width: 300px;

  color: var(--light);

  justify-content: center;
  align-items: center;
  padding: 1rem 2rem 2rem;
  flex-direction: column;
  border-radius: 5px;
`

const PostPopUp = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
`

const ComicReaderPopUpContainer = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
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
const ComicContainer = styled.div`
  overflow: auto;
  overscroll-behavior: contain;
  padding: 1rem 0.5rem;
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

export default ProfileScreen
