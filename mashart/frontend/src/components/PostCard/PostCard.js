import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import {
  faBook,
  faBookmark,
  faBullhorn,
  faFlag,
  faHeart,
} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const PostCard = ({
  post,
  role,
  flagPostHandler,
  reportPostHandler,
  popupHandler,
  comicReaderPopupHandler,
  likePostHandler,
  userId,
  noaction = false,
  setPostPopUp = () => {},
}) => {
  const {
    _id,
    users,
    path,
    title,
    description,
    reportCount,
    type,
    likes,
    reports,
  } = post

  return (
    <Container>
      <PostPictureContainer
        pointer={type === "comic"}
        onClick={
          type === "comic"
            ? () => comicReaderPopupHandler(title, path)
            : () => {}
        }
      >
        <PostPicture className="picturePost" src={path[0]} alt="postpic" />
      </PostPictureContainer>

      <PostInfo>
        <PostCollaborators>
          {users?.map((user) =>
            user.profileImage ? (
              <Link
                key={user.id}
                to={`/profile/${user.id}`}
                onClick={() => setPostPopUp(false)}
              >
                <CollabUser src={user.profileImage} alt="profile" />
              </Link>
            ) : (
              <Link
                key={user.id}
                to={`/profile/${user.id}`}
                onClick={() => setPostPopUp(false)}
              >
                <CollabUser
                  key={user.id}
                  src="/images/logo/logo.png"
                  alt="profile"
                />
              </Link>
            )
          )}
        </PostCollaborators>
        <Title>
          {title}
          {type === "comic" && (
            <FontAwesomeIcon className="icon comic" icon={faBook} size="sm" />
          )}
        </Title>
        <Description>
          {description ? description : "No Description..."}
        </Description>
        <PostIcons hide={noaction}>
          {role === "user" && (
            <>
              <FontAwesomeIcon
                className={likes?.includes(userId) ? "icon red" : "icon"}
                icon={faHeart}
                onClick={() => likePostHandler(_id)}
              />
              <FontAwesomeIcon
                className="icon"
                icon={faBookmark}
                onClick={popupHandler}
              />
            </>
          )}
          {role === "admin" || role === "moderator" ? (
            <FlagIconContainer>
              <p
                className="flag"
                data-report={reportCount}
                onClick={() => flagPostHandler(_id)}
              >
                <FontAwesomeIcon className="icon" icon={faFlag} />
              </p>
            </FlagIconContainer>
          ) : (
            <FontAwesomeIcon
              className={reports?.includes(userId) ? "icon red" : "icon"}
              icon={faBullhorn}
              onClick={() => reportPostHandler(_id)}
            />
          )}
        </PostIcons>
      </PostInfo>
    </Container>
  )
}

const Container = styled.div`
  background-color: var(--primary);
  color: var(--secondary-dark);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const PostCollaborators = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0;
  gap: 0.5rem;
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
  height: 300px;
  display: flex;
  justify-content: center;

  cursor: ${(props) => (props.pointer ? "pointer" : "")};
`

const PostPicture = styled.img`
  width: 300px;
  height: 300px;
  background-size: contain;
`

const PostInfo = styled.div`
  flex: 1;
  padding: 0.5rem 0.5rem 1rem;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: 1px;

  .icon.comic {
    margin-left: 0.5rem;
  }
`

const Description = styled.p`
  flex: 1;
  font-size: 0.75rem;
  text-align: justify;
  padding-bottom: 0.5rem;
  line-height: 1rem;
`

const PostIcons = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
  gap: 1rem;
  color: var(--secondary-dark);

  .icon {
    cursor: pointer;
  }

  .icon.red {
    color: red;
  }

  .icon:hover {
    color: var(--secondary);
  }

  .icon.red:hover {
    color: red;
  }
`

const FlagIconContainer = styled.div`
  position: relative;

  .flag[data-report]:after {
    content: attr(data-report);
    position: absolute;
    top: -5px;
    left: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    text-align: center;
    line-height: 18px;
    font-size: 0.6rem;
    font-weight: 600;
    color: var(--light);

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
