import React from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
//import { Link, useNavigate } from "react-router-dom"
import device from "../screen_sizes/devices"
const CollabScreen = () => {
    

    return (
        <>
            <Searchbar>
                    <p>Search for tags</p>
            </Searchbar>
            <Container> 
                
                <CollabHolder> 
                    <p className="heading"> Comic Collaborate with others </p>
                </CollabHolder>

                <CollabHolder> 
                    <p className="heading"> Create your own Collaborate Project </p>
                </CollabHolder>

                
            </Container>

            <Container>
                <CollabHolder> 
                    <p className="heading"> Recommended for you </p>
                </CollabHolder>
            </Container>
        </>
        
    )
}

const Container = styled.div`
    display: flex;
    align-items: inline;
    // overflow-y: scroll;
    // overflow-style: none;
    height: calc(100vh - 80px);

    .design-container {
    display: none;
    }
    
    @media ${device.laptop} {
    flex-direction: row;
    height: calc(100vh - 80px);
    justify-content: space-between;
    gap: 2rem;
    padding: 3rem 2rem;

        .design-container {
            display: inline-block;
        }
    }

    outline: 1px dashed red;
`
const Searchbar = styled.div`
    width: 100%;
    outline: 1px dashed blue;
`
const CollabHolder = styled.div`
background-color: #EBDFCE;
padding: 1rem 2rem;
align-items: inline;
border-radius: 5px;

height: 40%;
width: 100%;
display: flex;
flex-direction: column;
gap: 1.2rem;
outline: 1px dashed green;
`
export default CollabScreen