import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const UserCard = ({ user }) => {
  return (
    <Link to={`/profile/${user._id}`}>
      <Container>
        <div>
          <ProfileImageHolder size={"60px"}>
            {user.profileImg ? (
              <ProfileImage src={user.profileImg} alt="profile" />
            ) : (
              <FontAwesomeIcon icon={faUser} size="2x" />
            )}
          </ProfileImageHolder>
        </div>
        <p className="username">{user.username}</p>
      </Container>
    </Link>
  )
}

const Container = styled.section`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--secondary-light);
  color: var(--light);
  padding: 1rem 1.5rem;
  transition: 200ms ease-in-out;

  border-radius: 5px;

  cursor: pointer;

  &:hover {
    background: var(--secondary);
  }

  .username {
    font-size: 1.2rem;
  }
`

const ProfileImage = styled.img`
  height: ${(props) => props.height || "80px"};
  width: ${(props) => props.width || "80px"};
`

const ProfileImageHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.size || props.height || "80px"};
  width: ${(props) => props.size || props.width || "80px"};
  background-color: ${(props) => props.background || "var(--light)"};
  color: var(--secondary-dark);
  border-radius: 10px;
`

export default UserCard
