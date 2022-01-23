import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../components/TabComponent/Tabs";
import styled from "styled-components"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"
import { Input } from "../components/styled-components/Input";



const CollabScreen = () => {
    

    const [roomCode] = useState("")

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, userInfo, error } = userLogin

    return (
        <Hero>
            <Container>
                
                <div className="join-container">
                    <Form>
                        <p className="heading">Collab</p>
                        {loading && <Message>Loading...</Message>}
                        {error && <Message variant="error">{error}</Message>}
                        <SubmitButton type = "button" value="Start Room"  />


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
        
    ) 
}

const Hero = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
    font-size: 1.5rem;
    text-align: center;
  }

  @media ${device.laptop} {
    flex-direction: row;
    height: calc(100vh - 80px);
    justify-content: space-between;
    gap: 2rem;
    padding: 0 2rem;

  }

  outline: 1px dashed red;
`

const Form = styled.form`
  background-color: var(--secondary);
  padding: 2rem 2rem;
  border-radius: 5px;

  width: 350px;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  outline: 1px dashed black;
`

const SubmitButton = styled(Input)`
  background-color: var(--primary);
  color: var(--light);
  font-weight: 600;
  margin: 0rem 0 0rem;

  cursor: pointer;

  &:hover {
    background-color: var(--primary-dark);
  }
`

export default CollabScreen;