import React, { useState } from 'react';
import { useSelector } from "react-redux"
import styled from "styled-components"
import device from "../screen_sizes/devices"
const ActivityScreen = () => {
  const [image, setImage] = useState(null)
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user, error } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

    return (
    <div>
          <Container>
              <Form>
                    <MegaPanel>
                    
                        <ProfilePanel> 
                            <ProfileImage>
                                <img className= "profilePicture" src="/images/logo/logo.png" alt="profilepic" /> 
                                <p1 className = "username">  {user.username} @artist </p1>
                            </ProfileImage>

                            <Summary>
                                <p1 className = "summaryheading">  Summary </p1>
                            </Summary>    
                        </ProfilePanel>



                        <ActivityPanel>
                            <p1 className = "notifications">  Notifications </p1>
                        </ActivityPanel>
                    
                    </MegaPanel>         
              </Form>
          </Container>
    </div>
  )};


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    overflow: scroll;
    width: 100%;

    
    .heading {
        color: var(--light);
        font-size: 2rem;
        text-align: center;
  }

  .subheading{
      color: var(--light);
  }

  
  @media ${device.tablet} {
    height: calc(100vh - 160px);
    flex-direction: row;
    justify-content: space-between;
    overflow: visible;
    padding: 0 2rem;
   
`

const Form = styled.form`
  
  display: flex;
  flex-direction: column;
  align-content: space-between;

  background-color: #0077b6;
  padding: 1rem 2rem 1rem;
  border-radius: 5px;
  width: 100%;
  height: 95%;
  gap: 2 rem;
  color: black;
  
  .upload {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
  }
  .description {
    color: black;
    font-size: 1rem;
    font-weight: 600;
    
  }
  
`

const ProfilePanel = styled.section`
    background-color: #48cae4;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    height: 565px;
    width: 310px;
    align-content: space-evenly;
    
    border-radius: 40px;
    font-size: 30px;
    color: black;
  
    @media ${device.tablet} {
      gap: 5rem;
      flex-direction: row;
      justify-content: space-between;
    }
`
const Summary = styled.section`
    background-color: white;
    padding: 20px;
    height: 400px;
    width: 300px;
    
    border-radius: 40px;
    font-size: 30px;
    color: var(--light);

    .summaryheading {
        font-size: 30px; 
        color: black; 
      }
    @media ${device.tablet} {
      gap: 5rem;
      flex-direction: row;
      justify-content: space-between;
    }
`


const ProfileImage = styled.section`
    display: flex;
    align-content: center;
    gap: 2rem;
    height: 500px;
    width: 10px;
        
    .profilePicture {
      height: 120px;
      width: 120px;
      background-color: WHITE;
      border-radius: 20px;
    }
    .username {
      font-size: 20px;
    }
`
const ActivityPanel = styled.section`
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 565px;
    width: 440px;
    
    border-radius: 40px;
    font-size: 30px;
    color: var(--light);

    .notifications {
        font-size: 30px; 
        color: black; 
      }
  
    @media ${device.tablet} {
      gap: 5rem;
      flex-direction: row;
      justify-content: space-between;
    }
`

const MegaPanel = styled.div`
  display: flex;
  
  flex-direction: column;
  align-content: space-evenly;
  align-items: center;
  gap: 1rem; 

  @media ${device.tablet} {
    height: calc(100vh - 160px);
    flex-direction: row;
    justify-content: space-between;
    gap: 0rem;
  }
   
`
export default ActivityScreen;