import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { Input } from "../components/styled-components/Input"

import { useNavigate } from "react-router-dom"


const ComicsScreen = () => {
  const navigate = useNavigate()
  

  const userLogin = useSelector((state) => state.userLogin)


  return (
    <Container>
      <Heading>
        <span className = "title"> Comic Collaborate</span>
        <p className = "description"> Make your own, join or read comics you desire, anytime, anywhere.</p>
        <img className= "comicPicture1" src="/images/comics/boom.png" alt="boomcomic" />
        <img className= "comicPicture2" src="/images/comics/zap.png" alt="zapcomic" />
        <img className= "comicPicture3" src="/images/comics/cloud.png" alt="cloudcomic" />
        <img className= "comicPicture4" src="/images/comics/thunder.png" alt="thundercomic" />
        <ing className= "comic1" src="https://i.postimg.cc/W14BzFRP/garfield.png" alt="Garfield Comic"/>
        
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
      <Body>
        <img className="comic1" src="https://i.postimg.cc/W14BzFRP/garfield.png"></img> 
        <img className = "comic2" src="https://i.postimg.cc/mZq9FJC8/spiderman-comic.jpg"></img>
        <img className="comic3" src="https://i.postimg.cc/ZKbqnLDV/archie-comics.jpg"></img>
        <img className="comic4" src="https://i.postimg.cc/pXw1k0bB/tinkle-comics.jpg"></img>
        <img className="comic5" src="https://i.postimg.cc/C1tjSx0p/superman-comic.jpg"></img>
        <img className="comic6" src="https://i.postimg.cc/Rh5Ng69h/marvel-comics.jpg"></img>

      </Body>
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
  border-radius: 10px;
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
  .comicPicture1 {
    position: relative;
    height: 100px;
    width: 100px;
    padding: 2px;
    background-color: var(--secondary-dark);
    border-radius: 20px;
    margin-top: -100px;
  }
  .comicPicture3 {
    position: absolute;
    height: 50px;
    width: 70px;
    padding: 2px;
    //background-color: var(--secondary-dark);
    border-radius: 20px;
    margin-top: -30px;
    margin-left: -730px;
  }
  .comicPicture2 {
    position: relative;
    height: 90px;
    width: 90px;
    padding: 2px;
    background-color: var(--secondary-dark);
    border-radius: 20px;
    margin-top: -100px;
    margin-left: 550px;
  }
  .comicPicture4 {
    position: relative;
    height: 90px;
    width: 90px;
    padding: 2px;
    //background-color: var(--secondary-dark);
    border-radius: 20px;
    margin-top: -930px;
    margin-left: 680px;
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
const Body = styled.body`
  .comic1
  {
    width:250px;
    height:170px;
    border-radius:10px;
    position: absolute;
    margin-top: -20px;
    margin-right: 50px;
    margin-left: 27px;
    margin-bottom: 0px;
  }

  .comic2
  {
    width: 250px;
    height: 170px;
    border-radius: 10px;
    position: absolute;
    margin-top: -20px;
    margin-right: 0px;
    margin-left: 289px;
    margin-bottom: 0px;
  }

  .comic3
  {
    width: 250px;
    height: 170px;
    border-radius:10px;
    position: absolute;
    margin-top: -20px;
    margin-right: 0px;
    margin-left: 549px;
    margin-bottom:0px;
  }

  .comic4
  {
    width: 250px;
    height: 170px;
    border-radius:10px;
    position: absolute;
    margin-top: 170px;
    margin-left: 27px;
  }
  
  .comic5
  {
    width: 250px;
    height: 170px;
    border-radius:10px;
    position: absolute;
    margin-top: 170px;
    margin-left: 289px;
  }

    .comic6
    {
      width: 250px;
      height: 170px;
      border-radius:10px;
      position: absolute;
      margin-top: 170px;
      margin-left: 549px; 
    }
`



export default ComicsScreen
