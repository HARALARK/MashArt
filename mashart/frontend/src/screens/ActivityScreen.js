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

                      <ActivityBorder>
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
                      </ActivityBorder>
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
    width: 100vw;
    //outline: 1px dashed green;
    
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
    width: 100%;
    justify-content: space-between;
    overflow: visible;
    padding: 0 2rem;}
   
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: center;
  background: var(--background);
  padding: 0rem 2rem 0rem;
  border-radius: 5px;
  height: 95%;
  gap: 2 rem;
  color: black;
  
  height: 95%;
  
  @media ${device.tablet} {
    background: var(--secondary-light);}
`

const ProfilePanel = styled.section`
   
    background-color: var(--primary);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 20%;
    width: 100%;
    border-radius: 40px;
    
    font-size: 20px;
    color: black;
  
    @media ${device.tablet} {
      gap: 5rem;
      width: 30%;
      height: 90%;
      flex-direction: row;
      justify-content: space-between;
    }
`
const ProfileImage = styled.section`
    display: flex;
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
    background-color: #E6FBFF;
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
    
    border-radius: 40px;
    font-size: 30px;
    color: var(--light);

    .notifications {
        font-size: 30px; 
        color: black; 
      }
  
    @media ${device.tablet} {
      height: 100%;
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
    background-color: #E6FBFF;
    height: 60%;
    width:  90%;
    align-items: center;
    border-radius: 40px;
    font-size: 25px;
    color: black;
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
const ActivityBorder = styled.section`

background-color: var(--primary);
border-radius: 40px;
height: 90%;
padding: 0.5rem 1rem 0.5rem 1rem;

@media ${device.tablet} {
  background: none;
  padding: 0rem 0rem 0rem 0rem;
}
`







export default ActivityScreen;

