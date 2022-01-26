import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import WelcomeScreen from "./WelcomeScreen"

const Homepage = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return userInfo ? (
    <Hero> 
      <Container>
        <PostSection> 
          <PostUserID> 
          {/* img for profile picture */}
            <userName>  Samantha.smith</userName>
            <PostTime> 10 mins ago </PostTime>
          </PostUserID>

          <PostCollaborators> </PostCollaborators>
          <PostPicture> </PostPicture>
          <PostCaption> </PostCaption>

        </PostSection>
        




      </Container>
    </Hero>
    
  ) : (
    <div className="welcome-container">
      <WelcomeScreen />
    </div>
  )
}

const Hero = styled.section`
  // width: 100%;
  // display: flex;
  // justify-content: center;
  // align-items: center;
`
const Container = styled.section`
 // padding: 1rem 2rem;
  // test commit
`
const PostSection = styled.section`
 // padding: 1rem 2rem;
  // test commit
`
const PostUserID = styled.section`
 // padding: 1rem 2rem;
  // test commit
`
const userName = styled.section`
 // padding: 1rem 2rem;
  // test commit
`
const PostTime = styled.section`
 // padding: 1rem 2rem;
  // test commit
`
const PostCollaborators = styled.section`
 // padding: 1rem 2rem;
  // test commit
`
const PostPicture = styled.section`
 // padding: 1rem 2rem;
  // test commit
`
const PostCaption = styled.section`
 // padding: 1rem 2rem;
  // test commit
`
export default Homepage
