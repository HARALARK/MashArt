import React from "react"
import Tabs from "../components/TabComponent/Tabs";
import styled from "styled-components"

import device from "../screen_sizes/devices"
const CollabScreen = () => {
    

    return (
        <>
            
            <CreateCollab>
                <CollabHolder> 
                    <p className="heading"> Create your own Collaborate Project </p>
                </CollabHolder>
            </CreateCollab>
            <Container> 
                
                <Tabs />
            </Container>

        </>
        
    ) 
}

const CreateCollab = styled.div`

`
const PostsDisplay = styled.div `
    display: flex;
    color: white;
    height: 100%;
    width: 50%;
`

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
    
    outline: 1px dashed red;  For debugging
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

export default CollabScreen;