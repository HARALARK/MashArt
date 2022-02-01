import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import Message from "../components/styled-components/Message"
import { getPosts } from "../actions/postActions"
import PostCard from "../components/PostCard/PostCard"
import WelcomeScreen from "./WelcomeScreen"

const Homepage = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postsInfo = useSelector((state) => state.posts)
  const { loading, posts, error } = postsInfo

  useEffect(() => {
    if (!posts) {
      dispatch(getPosts())
    }
  }, [userInfo, posts, dispatch])

  console.log(posts)

  return userInfo ? (
    <Container>
      {loading && <Message>Loading...</Message>}
      {error && <Message variant="error">{error}</Message>}

      <PostsContainer>
        {posts ? (
          posts.posts.map((post) => <PostCard key={post._id} post={post} />)
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

const PostsContainer = styled.div`
  padding: 1rem 0;
`

export default Homepage
