import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"
import { Input } from "../components/styled-components/Input"
import GameInfo from "../components/GameInfo"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"

const ComicsScreen = () => {
  const navigate = useNavigate()
  const [roomCode, setRoomCode] = useState("")

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo, error } = userLogin

  const createRoomHandler = () => {
    /**
     * TODO: Complete functionality of Create Room
     * 1. dispatch request to create a Room
     * 2. redirect the user to collab screen with room id
     */
  }

  const joinRoomHandler = () => {
    /**
     * TODO: Complete functionality of Create Room
     * 1. dispatch request to check if room exists using the roomCode
     * 2. redirect the user to collab screen with room id
     */
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
  }, [userInfo, navigate])


  return (
    <Container>
      <Heading>
        <span className = "title"> Comic Collaborate</span>
        <p className = "description"> Make your own, join or read comics you desire, anytime, anywhere.</p>

      </Heading>
      <SearchBar>
        <Input
          type="text"
          placeholder="Search Comics"
          // value={searchText}
          // onChange={searchHandler}
        />
        <OptionContainer>
          <Button
            // className={option === "people" && "active"}
            // onClick={() => setOption("people")}
          >
            Trending
          </Button>
          <Button
            // className={option === "tags" && "active"}
            // onClick={() => setOption("tags")}
          >
            Your Comics
          </Button>
        </OptionContainer>
      </SearchBar>
      
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 10%;
  padding: 1rem 2rem 100px;

  align-items: center;
  justify-content: center;

  .heading {
    color: var(--light);
    font-size: 2rem;
    text-align: center;
  }
`
const Heading = styled.section`
  padding: 1rem 0 1rem;
  height: 130px;
  width: 2950%;
  align-items: center;
  margin-left: 820px;
  //margin-right: 200px;
  background-color: var(--secondary-dark);

  .title{
    color: var(--light);
    font-size: 2rem;
    text-align: center;
    align-items: center;
    margin-left: 230px;
    font-weight: 700; 
  }
  .description{
    color: var(--light);
    margin-left: 100px;
    margin-top: 10px;
    

  }
  
`
const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 820px;
  width: 2950%;
  margin-top: -30px;
  
`

const OptionContainer = styled.div`
  display: flex;
  gap: 1rem;
  
`
const Button = styled.p`
  flex: 1;
  text-align: center;
  padding: 0.5rem 1rem;
  border: 3px solid var(--secondary);
  color: white;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 200ms ease-in-out;
  margin-top: -1px;
  background-color: var(--secondary-dark);

  &.active {
    background-color: var(--secondary);
    color: var(--light);
  }

  &:hover {
    background-color: var(--secondary);
    color: var(--light);
  }

  `


const Form = styled.form`
  background-color: var(--secondary);
  padding: 1rem 2rem 2rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
`


export default ComicsScreen
