<<<<<<< HEAD
import React, {useState} from "react"
import {useDispatch, useSelector } from "react-redux";
// import Tabs from "../components/TabComponent/Tabs";
import styled from "styled-components"
import Message from "../components/styled-components/Message"
=======
import React from "react"
import Tabs from "../components/TabComponent/Tabs";
import styled from "styled-components"

>>>>>>> 0f52738 (Added tabs component with styling)
import device from "../screen_sizes/devices"
import { Input } from "../components/styled-components/Input";
import { Link } from "react-router-dom";



const CollabScreen = () => {
    

    const [roomCode] = useState("")

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error } = userLogin

    return (
<<<<<<< HEAD
        <Hero>
            <Container>
                
                <div className="join-container">
                    <Form>
                        <p className="heading">Collaborate!</p>
                        {loading && <Message>Loading...</Message>}
                        {error && <Message variant="error">{error}</Message>}
                          <SubmitButton type = "button" value="Start Room"  />
                        <Divider></Divider>
                        <Input
                            type="text"
                            placeholder="Room Code"
                            // Need something here to search for valid room
                            required
                        />

                        <SubmitButton type = "button" value="Join Room"  />
                    </Form>
                </div>
            </Container>
        </Hero>
=======
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
>>>>>>> 0f52738 (Added tabs component with styling)
        
    ) 
}

<<<<<<< HEAD
const Hero = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Divider = styled.section`
  outline: 1px dashed white;
`
=======
const CreateCollab = styled.div`

`
const PostsDisplay = styled.div `
    display: flex;
    color: white;
    height: 100%;
    width: 50%;
`

>>>>>>> 0f52738 (Added tabs component with styling)
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 80px);
  .design-container {
    display: none;
  }

  .heading {
    color: var(--light);
    font-size: 2rem;
    text-align: center;
  }

  @media ${device.laptop} {
    flex-direction: row;
    height: calc(100vh - 80px);
    justify-content: space-between;
    gap: 2rem;
    padding: 0 2rem;

<<<<<<< HEAD
  }

`
=======
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
>>>>>>> 0f52738 (Added tabs component with styling)

const Form = styled.form`
  background-color: var(--secondary-dark);
  padding: 2rem 2rem 1rem;
  border-radius: 5px;

  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

`

<<<<<<< HEAD
const SubmitButton = styled(Input)`
  background-color: var(--primary);
  color: var(--dark);
  font-weight: 600;
  margin: 0rem 0 0rem;
  font-size: 1rem;
  padding-bottom: 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-dark);
  }
`

=======
>>>>>>> 0f52738 (Added tabs component with styling)
export default CollabScreen;