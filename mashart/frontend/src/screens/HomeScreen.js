import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import Message from "../components/styled-components/Message"
import { getPosts, resetPosts } from "../actions/postActions"

import WelcomeScreen from "./WelcomeScreen"
import PostsContainer from "../components/PostsContainer/PostsContainer"

const Homepage = () => {
  const dispatch = useDispatch()

  const [option, setOption] = useState("user")

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postsInfo = useSelector((state) => state.posts)
  const { loading, posts, error } = postsInfo

  useEffect(() => {
    if (!posts) {
      dispatch(getPosts(option))
    }
  }, [userInfo, posts, dispatch, option])

  const changeRole = async (role) => {
    setOption(role)
    dispatch(resetPosts())
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
      {posts && <PostsContainer posts={posts} option={option} />}
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

export default Homepage
