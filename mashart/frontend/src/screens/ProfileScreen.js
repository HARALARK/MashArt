import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { getUserDetails } from "../actions/userActions"
import Message from "../components/styled-components/Message"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import device from "../screen_sizes/devices"
import Tabs from "../components/TabComponent/Tabs"

const ProfileScreen = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user, error } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    } else {
      if (id === userInfo._id) {
        navigate("/profile")
      } else if (id && (id !== user._id || !user.username)) {
        dispatch(getUserDetails(`profile?_id=${id}`))
      } else if (id === undefined) {
        if (!user.username || user._id !== userInfo._id) {
          dispatch(getUserDetails("profile"))
        }
      }
    }
  }, [userInfo, navigate, user, dispatch, id])

  return (
    <Container>
      {loading && <Message>Loading...</Message>}
      {error && <Message variant="error">{error}</Message>}
      <InfoSection>
        <InfoContainer>
          <MiscHolder>
            {/* For Collaborations and Non-Collab posts */}
            <MiscInfo>
              <p className="title">Collaborations</p>
              {/* Placeholder, should have something to identify collab posts of a user */}
              <p>{user.posts || 0} </p>
            </MiscInfo>
            <MiscInfo>
              <p className="title">Posts</p>
              <p>{user.posts || 0}</p>
            </MiscInfo>
          </MiscHolder>
          <ProfileHolder>
            <ProfileImageHolder>
              {user.profileImage && user.profileImage.imageSrc ? (
                <ProfileImage src={user.profileImage.imageSrc} alt="profile" />
              ) : (
                <FontAwesomeIcon icon={faUser} size="3x" />
              )}
            </ProfileImageHolder>
            <ProfileUsername>{user.username}</ProfileUsername>
          </ProfileHolder>
          <MiscHolder>
            <MiscInfo>
              <p className="title">Followers</p>
              <p>{user.followers || 0}</p>
            </MiscInfo>

            <MiscInfo>
              <p className="title">Following</p>
              <p>{user.following || 0}</p>
            </MiscInfo>
          </MiscHolder>
        </InfoContainer>
        {id ? (
          <></>
        ) : (
          <EditButton>
            <Link className="link" to="/edit-profile">
              <Button>Edit Profile</Button>
            </Link>
          </EditButton>
        )}
      </InfoSection>
      <Tabs />
      <PostContainer>
        {user.posts ? <></> : <p className="no-posts">No Posts</p>}
      </PostContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem 2rem 100px;
  color: var(--secondary-dark);
`

const InfoSection = styled.section`
  padding: 1rem 0 1rem;
  width: 100%;
  border-bottom: 2px solid var(--background-dark);
  .link {
    text-decoration: none;
  }
`

const EditButton = styled.div`
  @media ${device.tablet} {
    display: flex;
    align-items: center;
    justify-content: center;
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

  &:hover {
    background-color: var(--secondary);
    color: var(--light);
  }

  @media ${device.tablet} {
    margin: 0;
    width: 150px;
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
  justify-content: space-between;
  padding: 0 1rem;
  width: 100%;
  flex-direction: column;
  @media ${device.tablet} {
    padding: 0;
    justify-content: space-evenly;
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

const PostContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 0;

  .no-posts {
    width: 100%;
    text-align: center;
    font-size: 2rem;
    color: var(--primary-dark);
    font-weight: 500;
  }
`

export default ProfileScreen
