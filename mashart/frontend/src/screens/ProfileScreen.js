import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { getUserDetails } from "../actions/userActions"
import Message from "../components/styled-components/Message"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import device from "../screen_sizes/devices"

const ProfileScreen = () => {
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
      if (!user.username) {
        dispatch(getUserDetails("profile"))
      }
    }
  }, [userInfo, navigate, user, dispatch])

  return (
    <Container>
      {loading && <Message>Loading...</Message>}
      {error && <Message variant="error">{error}</Message>}
      <InfoSection>
        <InfoContainer>
          <ProfileHolder>
            <ProfileImageHolder>
              {user.profileImg ? (
                <ProfileImage src={user.profileImg} alt="profile" />
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
              <p className="title">Posts</p>
              <p>{user.posts || 0}</p>
            </MiscInfo>
            <MiscInfo>
              <p className="title">Following</p>
              <p>{user.following || 0}</p>
            </MiscInfo>
          </MiscHolder>
        </InfoContainer>
        <Link className="link" to="/profile/edit">
          <Button>Edit Profile</Button>
        </Link>
      </InfoSection>
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
  padding-bottom: 100px;
`

const InfoSection = styled.section`
  background: #e98e24;
  padding: 2rem 2rem 1rem;
  width: 100%;

  .link {
    text-decoration: none;
  }
`

const Button = styled.p`
  text-align: center;
  padding: 0.5rem 1rem;
  border: 3px solid #000;
  color: #000;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 250ms ease-in-out;

  &:hover {
    background-color: #dd4a5c;
    color: #fff;
    border: 3px solid #dd4a5c;
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
  @media ${device.tablet} {
    margin: 0 0 0.5rem 35px;
  }
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
  background-color: ${(props) => props.background || "#ffffff"};
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
  @media ${device.tablet} {
    padding: 0;
    justify-content: flex-end;
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
    padding-left: 1rem;
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
    color: #dd4a5c;
    font-weight: 500;
  }
`
export default ProfileScreen