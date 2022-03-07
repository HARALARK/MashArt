import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import device from "../screen_sizes/devices"
import { DescInput } from "../components/styled-components/Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDoorOpen} from "@fortawesome/free-solid-svg-icons"
const EditArtScreen = () => {
  const [image, setImage] = useState(null)
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user, error } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

    return (
    <div>
          <Container>
              <Form>
                    <Header> 
                        <RoomContainer>
                          <img className= "profilePicture" src="/images/logo/logo.png" alt="profilepic" /> 
                          <p1 className = "username">  {user.username}'s Room </p1>
                          
                          <p1 className = "roomno"> - 2nsX3 </p1>
                        </RoomContainer>
                        
                        <CollaboratorContainer>
                        <img className= "collaborator" src="/images/logo/logo.png" alt="collaborator1" />
                        <img className= "collaborator" src="/images/logo/logo.png" alt="collaborator2" />
                        <img className= "collaborator" src="/images/logo/logo.png" alt="collaborator3" />
                        </CollaboratorContainer>
                        
                        
                    </Header>
                    
                    <UploadContainer>
                      <p className = "upload"> Upload Artwork </p>
                      <Button className="uploadart"> Upload </Button>
                    </UploadContainer>
                    
                    <ImgDescContainer>
                      <ImgContainer>
                        {image ? (
                          <img className="post" src={image} alt="post" />
                        ) : (
                          <ImagePlaceHolder>
                            <p className="no-post">No Image</p>
                          </ImagePlaceHolder>
                        )}
                      </ImgContainer>

                      <DescContainer>
                      <TextArea
                        rows="3"
                        name="text"
                        placeholder="Description"
                      ></TextArea>
                      </DescContainer>

                    </ImgDescContainer>
                    
                    <FilterContainer>
                      <Filters> 
                          <img className= "filter" src="/images/logo/logo.png" alt="filter1" />
                          <img className= "filter" src="/images/logo/logo.png" alt="filter2" />
                          <img className= "filter" src="/images/logo/logo.png" alt="filter3" />
                          <img className= "filter" src="/images/logo/logo.png" alt="filter4" />
                          <img className= "filter" src="/images/logo/logo.png" alt="filter5" />
                      </Filters>

                      
                    </FilterContainer>
                    
                    <Button className="leaveroom" >
                      Leave Room   
                      <FontAwesomeIcon icon={faDoorOpen} size ='m' style={{ color: 'white' }}/> 
                      </Button>           
              </Form>
          </Container>
      
    </div>
  )};



const CollaboratorContainer = styled.section`
  display: flex;
  gap: 1rem;
  
  .collaborator{
    height: 50px;
    width: 50px;
    background-color: white;
    border-radius: 10px;
  }

  @media ${device.tablet} {
    justify-content: space-between;
    flex-direction: row;
    
  }
`

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

const DescContainer = styled.section`
    height: 100%;
    width: 100%;

    @media ${device.tablet} {
      height: 100%;
      width: 50%;
      padding: 0rem 1rem 0rem 1rem;
    }
`
const FilterContainer = styled.section`
    height: 30%;
    width: 100%;
    padding: 1rem 0rem 2rem 0rem;
    gap: 1rem;
    @media ${device.tablet} {
      width: 100%;
      padding: 1rem 1rem 0rem 1rem;
    }
`
const ImgDescContainer = styled.div`
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

const ImgContainer = styled.div`
 
  display: flex;
  width: 100%;
  height: 300px;

  .post {
    height: 300px;
    width: 300px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  @media ${device.tablet} {
    height: 100%;
    width: 50%;
  }
`
const RoomContainer = styled.section`
    display: flex;
    align-content: center;
    gap: 1rem;

    .profilePicture {
      height: 50px;
      width: 50px;
      background-color: #ffe6aa;
      border-radius: 10px;
    }
    .username {
      font-size: 30px;
      
    }
    .roomno {
      font-size: 20px;
    }
`

const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;

  @media ${device.tablet} {
    padding: 0.5rem;
  }
`

const Button = styled.p`
  flex-direction: row;
  text-align: center;
  padding: 0.4rem 1rem;
  color: var(--light);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: 100ms ease-in-out;
 
  &.leaveroom {
    align-self: start;
    background-color: var(--secondary);

    &:hover {
      background-color: #8b0000;
      color: var(--light);
    }
  }

   &.uploadart {
    background-color: #023e8a;
  }

  &:hover {
    background-color: var(--secondary);
    color: var(--light);
  }

  @media ${device.tablet} {
    margin: 0;
    width: 20%;

    &.leaveroom {
      align-self: flex-end;
      background-color: var(--secondary);
  
      &:hover {
        background-color: #8b0000;
        color: var(--light);
      }
    }
  }
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
const Filters = styled.section`
    display: flex;
    background-color: var(--secondary);
    
    align-items: center;
    padding: 1rem 1rem 1rem 2rem;

    border-radius: 20px;
    font-size: 30px;
    gap: 1rem;

    .filter{
        height: 50px;
        width: 50px;
        background-color: white;
        border-radius: 10px;
    }

    @media ${device.tablet} {
      flex-wrap: nowrap;
      width: 50%;
    }
    
`

const Header = styled.section`
    background-color: var(--secondary);
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: space-around;
    padding: 10px;
    
    border-radius: 20px;
    font-size: 30px;
    color: var(--light);
  
    @media ${device.tablet} {
      gap: 5rem;
      flex-direction: row;
      justify-content: space-between;
    }
   
`

const ImagePlaceHolder = styled.div`
  
  background-color: var(--grey-light);
  opacity: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;

  .no-post {
    color: var(--dark);
    font-size: 1.5rem;
  }

  @media ${device.tablet} {
    width: 100%;
    height: 100%;
  }
`

const TextArea = styled.textarea`
  font-family: "Poppins";
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  outline: none;
  width: 100%;
  height: 100%;
`
export default EditArtScreen;