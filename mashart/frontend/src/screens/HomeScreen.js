import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import Message from "../components/styled-components/Message"
import { flagPost, getPosts } from "../actions/postActions"
import PostCard from "../components/PostCard/PostCard"
import WelcomeScreen from "./WelcomeScreen"

const Homepage = () => {
  const dispatch = useDispatch()

  const [option, setOption] = useState("user")

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postsInfo = useSelector((state) => state.posts)
  const { loading, posts, error } = postsInfo

  useEffect(() => {
    if (!posts) {
      dispatch(getPosts())
    }
  }, [userInfo, posts, dispatch])

  const flagPostHandler = (id) => {
    dispatch(flagPost(id))
  }

  return userInfo ? (
    <Container>
      {loading && <Message>Loading...</Message>}
      {error && <Message variant="error">{error}</Message>}

      {(userInfo.role === "admin" || userInfo.role === "moderator") && (
        <OptionContainer>
          <Button
            className={option === "user" && "active"}
            onClick={() => setOption("user")}
          >
            User
          </Button>
          <Button
            className={option === userInfo.role && "active"}
            onClick={() => setOption(userInfo.role)}
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
            />
          ))
        ) : (
          <></>
        )}
      </PostsContainer>
    </Container>
  ) : (
    <div className="welcome-container">
      <WelcomeScreen />
    </div>
  )
}

const Container = styled.section`
  padding: 1rem 2rem 100px;
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
`

const PostsContainer = styled.div`
  padding: 1rem 0;
`

export default Homepage
