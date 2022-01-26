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
  padding: 1rem 2rem;
`
const PostSection = styled.section`
 // padding: 1rem 2rem;
  
`
const PostUserID = styled.section`
 // padding: 1rem 2rem;
  
`
const userName = styled.section`
 // padding: 1rem 2rem;
  
`
const PostTime = styled.section`
 // padding: 1rem 2rem;
  
`
const PostCollaborators = styled.section`
 // padding: 1rem 2rem;
  
`
const PostPicture = styled.section`
 // padding: 1rem 2rem;
  
`
const PostCaption = styled.section`
 // padding: 1rem 2rem;
  
`

export default Homepage


