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
        {/* <PostSection>  */}
          <PostUserID> 
          {/* img for profile picture */}
            <img className= "profilePicture" src="/images/logo/logo.png" alt="profilepic" /> 
            <span className = "userName">  samantha.smith</span>
            <span className = "PostTime"> 10 mins ago </span>
          </PostUserID>

          <PostCollaborators> </PostCollaborators>
          <PostPicture> </PostPicture>
          <PostCaption> 
            <PostIcons> 
              <div className = "likeButton"> </div>
              <div className = "commentButton"> </div>
            </PostIcons>
          </PostCaption>

        {/* </PostSection> */}
        


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
   border-radius: 20px;
   box-shadow: 0px 0px 16px -8px rgba(0,0,0,0.40);
   -webkit-box-shadow: -8px 6px 16px 0px rgba(0,0,0,0.40);
    margin: 40px 0;
    background-color: var(--primary);
    
   

//    display: flex;
//    justify-content: center;
//    align-items: center;
`
const Container = styled.section`
    //margin-top: 40 px;
    padding: 1rem 2rem;
`
// const PostSection = styled.section`
//     width : 100%;
// `
const PostUserID = styled.section`
    padding: 10px;
    display: flex;
    //justify-content: space-between;
    background-color: var(--primary-light);
    border-radius: 20px;
    

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


// const userName = styled.section`
//  // padding: 1rem 2rem;
  
// `
// const PostTime = styled.section`
//  // padding: 1rem 2rem;
  
// `
const PostCollaborators = styled.section`
 // padding: 1rem 2rem;
  
`
const PostPicture = styled.section`
 // padding: 1rem 2rem;
  
`
const PostCaption = styled.section`
 // padding: 1rem 2rem;
  
`
const PostIcons = styled.section`
 // padding: 1rem 2rem;
  
`
// const likeButton = styled.section`
//  // padding: 1rem 2rem;
  
// `
// const commentButton = styled.section`
//  // padding: 1rem 2rem;
  
// `

export default Homepage



