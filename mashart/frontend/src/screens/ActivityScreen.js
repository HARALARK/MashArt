import React, { useState } from 'react';
import { useSelector } from "react-redux"
import styled from "styled-components"
import device from "../screen_sizes/devices"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment, faGraduationCap, faHeart, faHeartbeat, faImage, faImages, faLayerGroup, faObjectGroup, faUserCircle} from "@fortawesome/free-solid-svg-icons"


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
                                <p1 className = "username">  @{user.username} </p1>
                                <Summary>
                                  <span className = "title"> Summary <br/></span>
                                  
                                  <FontAwesomeIcon icon={faHeart} size = 'm' style={{ color: '#03045E' }}/>
                                  <p1 className = "count">  10 Likes <br/></p1>

                                  <FontAwesomeIcon icon={faComment} size = 'm' style={{ color: '#03045E' }}/>
                                  <p1 className = "count">  20 Comments <br/></p1>

                                  <FontAwesomeIcon icon={faObjectGroup} size = 'm' style={{ color: '#03045E' }}/>
                                  <p1 className = "count">  30 Collabs <br/></p1>

                                  <FontAwesomeIcon icon={faImages} size = 'm' style={{ color: '#03045E' }}/>
                                  <p1 className = "count">  40 Artworks <br/></p1>

                                </Summary>
                            </ProfileImage>
                        </ProfilePanel>

                        <ActivityPanel>
                            <Notifications>
                              <span className = "title"> Notifications </span>
                              <FontAwesomeIcon icon={faHeartbeat} size = 'm' style={{ color: '#03045E' }}/>
                              <p1 className = "notifications"><br/></p1>
                
                              <FontAwesomeIcon icon={faHeart} size = 'xs' style={{ color: '#03045E' }}/>
                              <p1 className = "notifications">  Ethan Hunt liked your artwork "Blues" <br/></p1>

                              <FontAwesomeIcon icon={faHeart} size = 'xs' style={{ color: '#03045E' }}/>
                              <p1 className = "notifications">  Ethan Hunt liked your artwork "Blues" <br/></p1>

                              <FontAwesomeIcon icon={faComment} size = 'xs' style={{ color: '#03045E' }}/>
                              <p1 className = "notifications">  Minion commented on your artwork "Blues" <br/></p1>

                              <FontAwesomeIcon icon={faObjectGroup} size = 'xs' style={{ color: '#03045E' }}/>
                              <p1 className = "notifications">  Taylor Swift collaborated to your artwork "Blues" <br/></p1>
                              
                              <FontAwesomeIcon icon={faComment} size = 'xs' style={{ color: '#03045E' }}/>
                              <p1 className = "notifications">  Minion commented on your artwork "Blues" <br/></p1>

                              <FontAwesomeIcon icon={faObjectGroup} size = 'xs' style={{ color: '#03045E' }}/>
                              <p1 className = "notifications">  Taylor Swift collaborated to your artwork "Blues" <br/></p1>

                              <FontAwesomeIcon icon={faHeart} size = 'xs' style={{ color: '#03045E' }}/>
                              <p1 className = "notifications">  Ethan Hunt liked your artwork "Blues" <br/></p1>

                              <FontAwesomeIcon icon={faComment} size = 'xs' style={{ color: '#03045E' }}/>
                              <p1 className = "notifications">  Minion commented on your artwork "Blues" <br/></p1>

                              <FontAwesomeIcon icon={faObjectGroup} size = 'xs' style={{ color: '#03045E' }}/>
                              <p1 className = "notifications">  Taylor Swift collaborated to your artwork "Blues" <br/></p1>

                              <FontAwesomeIcon icon={faComment} size = 'xs' style={{ color: '#03045E' }}/>
                              <p1 className = "notifications">  Minion commented on your artwork "Blues" <br/></p1>
                            </Notifications>

                            
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
    border-radius: 40px;
    background-color: #90e0ef;
    display: flex;
    padding: 5px;
    height: 565px;
    width: 240px;
    border: 1px solid #03045E;

    //align-items: center;
    //flex-direction: column;
    //justify-content: center;


    font-size: 20px;
    color: black;
  
    @media ${device.tablet} {
      gap: 5rem;
      flex-direction: row;
      justify-content: space-between;
    }
`
const ProfileImage = styled.section`
    display: flex;
    //gap: 1rem;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
    color: black;
    padding: 10px;

    .profilePicture {
      height: 150px;
      width: 150px;
      padding: 2px;
      background-color: WHITE;
      border-radius: 20px;
    }
`
const ActivityPanel = styled.section`
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 565px;
    width: 510px;
    border: 1px solid #03045E;
    
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

const Notifications = styled.section`
  align-items: center;
  
  .title{
    color: #03045e;
    font-size: 2rem;
    align-items: center;
    font-weight: 600; 
  }
  .notifications{
    font-size: 1rem;
    color: black;
    padding: 5px;
  }
  
`
const Summary = styled.section`
    background-color: white;
    height: 600px;
    width:  210px;
    align-items: center;
    border-radius: 40px;
    font-size: 25px;
    color: black;
    margin-top: 10px;
    padding: 20px;
    
    
    .title {
      align-items: center;
    }
    .count {
        font-size: 17px; 
        color: black; 
        padding: 10px;
        font-weight: 400;
      }
    @media ${device.tablet} {
      gap: 5rem;
      flex-direction: row;
      justify-content: space-between;
    }
`








export default ActivityScreen;

