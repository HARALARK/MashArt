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
          <PostUserID> 
          {/* placeholder image for profile picture */}
            <img className= "profilePicture" src="/images/logo/logo.png" alt="profilepic" /> 
            <span className = "userName">  samantha.smith</span>
            <span className = "PostTime"> 10 mins ago </span>
          </PostUserID>

          {/* placeholder images for collaborator profile pictures */}
          <PostCollaborators> 
            <img className= "collab1" src="/images/logo/logo.png" alt="collab1" />
            <img className= "collab2" src="/images/logo/logo.png" alt="collab2" />
            <img className= "collab3" src="/images/logo/logo.png" alt="collab3" />
          </PostCollaborators>

          <PostPicture> 
          <img className= "picturePost" src="/images/samplepainting.PNG" alt="postpic" /> 
          </PostPicture>

          <PostCaption> 
            <PostIcons> 
              {/* <likeButton type = "button" value = "/images/logo/logo.png" />
              <button className = "commentButton"> </button>
              <button className = "commentButton"> </button>
              <button className = "saveButton"> </button> */}
            </PostIcons>
          </PostCaption>
      </Container>
    </Hero>
    
  ) : (
    <div className="welcome-container">
      <WelcomeScreen />
    </div>
  )
}

const Hero = styled.section`
    width: 100%;
    height: 360px;
    border-radius: 20px;
    box-shadow: 0px 0px 16px -8px rgba(0,0,0,0.40);
   -webkit-box-shadow: -8px 6px 16px 0px rgba(0,0,0,0.40);
    margin: 40px 0;
    background-color: var(--primary);
`
const Container = styled.section`
    padding: 1rem 2rem;
`

const PostUserID = styled.section`
    background-color: var(--primary-light);
    padding: 10px;
    display: flex;
    border-radius: 20px;
    font-size: 15px;
    margin-left: 25px;
    height: 50px;
    width: 870px;
    margin-left: -15px;

    .profilePicture {
        height: 35px;
        width: 35px;
        background-color: #ffe6aa;
        border-radius: 45px;
        padding: 5px; 
        margin-right: 10px;
    }

    .PostTime{
        margin-left: 530px;
    }
`

const PostCollaborators = styled.section`
    padding: 10px;
    display: flex;
    background-color: var(--primary-light);
    border-radius: 20px;
    float: left;
    margin-left: -20px;
    width: 30px;
    height: 250px;


    .collab1{
        height: 25px;
        width: 25px;
        background-color: white;
        border-radius: 45px;
        padding: 5px; 
        margin-left: -7px;
    }

    .collab2{
        height: 25px;
        width: 25px;
        border-radius: 45px;
        padding: 5px; 
        margin-top: 50px;
        margin-left: -25px;
        background-color: white;

    }
    .collab3{
        height: 25px;
        width: 25px;
        border-radius: 45px;
        padding: 5px; 
        margin-top: 100px;
        margin-left: -25px;
        background-color: white;
    }
  
`
const PostPicture = styled.section`
    border-radius: 45px;
    padding: 5px; 

    .picturePost{
        margin-left: 5px;
        height: 250px;
        width: 350px;
        border-radius: 15px;
    }
  
`
const PostCaption = styled.section`
    background-color: var(--primary-dark); //for caption
    height: 250px;
    width: 460px;
    margin-left: 385px;
    margin-top: -260px;
    border-radius: 20px;
  
`
const PostIcons = styled.section`
  
`

export default Homepage