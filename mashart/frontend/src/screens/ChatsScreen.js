import React, { useState } from 'react';
import { useSelector } from "react-redux"
import styled from "styled-components"
import device from "../screen_sizes/devices"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMailBulk} from "@fortawesome/free-solid-svg-icons"


const ChatsScreen = () => {
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
                        <Heading>
                            <span className = "title"> Chats </span>
                            <FontAwesomeIcon icon={faMailBulk} size = 'XL' style={{ color: 'white' }}/> 
                        </Heading>
                        
                        <UnderHeader>
                            <ChatPanel></ChatPanel>
                            <AllChats></AllChats>
                        </UnderHeader>
                        
                      
                        
                        
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

const MegaPanel = styled.section`
  height 100%;
  width 100%;
  align-items: center;
  border-radius: 20px;
  padding 5px;
  margin-bottom: 500px;
  border: 1px solid white;
  }
  
`
const UnderHeader = styled.section`
    display: flex;
    flex-direction: column;
    height: 80%;
    width: 100%;
    border-radius: 40px;
    font-size: 30px;
    border: 1px solid black;
    @media ${device.tablet} {
      gap: 2rem;
      flex-direction: row;
      justify-content: space-between;
    }
`

const ChatPanel = styled.section`
    background-color: #90e0ef;
    display: flex;
    flex-direction: column;
    height: 100%;   
    width: 50%;
    border-radius: 40px;
    font-size: 30px;
  
    @media ${device.tablet} {
      gap: 5rem;
      flex-direction: row;
      justify-content: space-between;
    }
`
const AllChats = styled.section`
    background-color: #90e0ef;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;
    border-radius: 40px;
    font-size: 30px;

    @media ${device.tablet} {
    gap: 5rem;
    flex-direction: row;
    justify-content: space-between;
    }
    `


const Heading = styled.section`
    height 12%;
    width 100%;
    align-items: center;
    border-radius: 20px;
    padding 5px;
    margin-bottom: 500px;
    border: 1px solid white;
    background-color: #023e8a;
    color: var(--light);
    font-size: 2rem;
    text-align: center;
    font-weight: 500; 
`


export default ChatsScreen;
