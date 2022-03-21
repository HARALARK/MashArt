import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import {
  faBookmark,
  faBullhorn,
  faComment,
  faFlag,
  faHeart,
} from "@fortawesome/free-solid-svg-icons"
import device from "../../screen_sizes/devices"

const PostCard = ({ post, role, flagPostHandler, reportPostHandler }) => {
  const { _id, users, path, title, subtitle, description, reportCount } = post

  return (
    <Container>
      <PostCollaborators>
        {users ? (
          users.map((user) =>
            user.profileImage ? (
              <CollabUser key={user.id} src={user.profileImage} alt="profile" />
            ) : (
              <CollabUser
                key={user.id}
                src="/images/logo/logo.png"
                alt="profile"
              />
            )
          )
        ) : (
          <CollabUser src="/images/logo/logo.png" alt="profile" />
        )}
      </PostCollaborators>

      <PostPictureContainer>
        <PostPicture className="picturePost" src={path} alt="postpic" />
      </PostPictureContainer>

      <PostInfo>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Description>{description}</Description>
        <PostIcons>
          <FontAwesomeIcon className="icon" icon={faHeart} size="lg" />
          <FontAwesomeIcon className="icon" icon={faComment} size="lg" />
          <FontAwesomeIcon className="icon" icon={faBookmark} size="lg" />
          {role === "admin" || role === "moderator" ? (
            <FlagIconContainer>
              <p
                className="flag"
                data-report={reportCount}
                onClick={() => flagPostHandler(_id)}
              >
                <FontAwesomeIcon className="icon" icon={faFlag} size="lg" />
              </p>
            </FlagIconContainer>
          ) : (
            <FontAwesomeIcon
              className="icon"
              icon={faBullhorn}
              size="lg"
              onClick={() => reportPostHandler(_id)}
            />
          )}
        </PostIcons>
      </PostInfo>
    </Container>
  )
}

const Container = styled.div`
  background-color: var(--primary-dark);
  color: var(--secondary-dark);
  border-radius: 10px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;

  @media ${device.tablet} {
    flex-direction: row;
    gap: 1rem;
  }
`

const PostCollaborators = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0;
  gap: 0.5rem;

  @media ${device.tablet} {
    flex-direction: column;
    gap: 0.2rem;
  }
`

const CollabUser = styled.img`
  height: 30px;
  width: 30px;
  background-color: var(--light);
  border-radius: 50%;
  font-size: 0.4rem;
  text-align: center;
`

const PostPictureContainer = styled.div`
  flex: 1;
  background: var(--grey-light);
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
`

const PostPicture = styled.img`
  width: 300px;
  background-size: contain;
`

const PostInfo = styled.div`
  flex: 1;
  padding: 0.5rem 0.5rem 1rem;
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    padding: 1.5rem 1rem;
  }
`

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.8rem;
  letter-spacing: 2px;
  line-height: 90%;
`

const Subtitle = styled.h2`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 90%;
  margin-bottom: 1rem;

  @media ${device.tablet} {
    margin-bottom: 2rem;
  }
`

const Description = styled.p`
  flex: 1;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 95%;
  text-align: justify;
`

const PostIcons = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 1rem;
  color: var(--secondary-dark);

  .icon {
    cursor: pointer;
  }

  .icon:hover {
    color: var(--secondary);
  }

  @media ${device.tablet} {
    margin-top: 2.5rem;
  }
`

const FlagIconContainer = styled.div`
  position: relative;

  .flag[data-report]:after {
    content: attr(data-report);
    position: absolute;
    top: -8px;
    left: 16px;

    text-align: center;
    line-height: 18px;
    font-size: 0.7em;
    font-weight: 600;
    color: var(--light);

    padding: 0.1rem;
    background: red;
    height: 18px;
    width: 18px;
    border-radius: 50%;
  }

  .flag {
    cursor: pointer;
  }

  .flag:hover .icon {
    color: var(--secondary);
  }
`

export default PostCard
