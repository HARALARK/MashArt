import React, {useState} from "react"
import { useSelector } from "react-redux";
import styled from "styled-components"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"
import { Input } from "../components/styled-components/Input";
import GameInfo from "../components/GameInfo";


const CollabScreen = () => {
  

    const [roomCode] = useState("")

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error } = userLogin

    return (
        <Hero>
            <Container>
                <div className ="explain-container">
                  <GameInfo />
                </div>
                <div className="join-container">
                    <Form>
                        <p className="heading">Collaborate!</p>
                        {loading && <Message>Loading...</Message>}
                        {error && <Message variant="error">{error}</Message>}
                          <SubmitButton type = "button" value="Create Room"  />
                        
                        <div className="room-container">
                        <Input
                            type="text"
                            placeholder="Room Code"
                            // Need something here to search for valid room
                            required
                        />

                        <SubmitButton type = "button" value="Join Room"  />
                        </div>
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
  

  .heading {
    color: var(--light);
    font-size: 2rem;
    text-align: center;
  }

  @media ${device.laptop} {
    height: calc(100vh - 80px);
    justify-content: space-between;
    gap: 2rem;
    padding: 0 2rem 3rem;
    .explain-container {
      display: flex;
      
    }
  }

  
`

const Form = styled.form`
  background-color: var(--secondary-dark);
  padding: 2rem 2rem 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  
  @media ${device.tablet} {
    height: 400px;
    width: 400px;
  }

  .room-container{
    flex-direction: column;
    background-color: var(--secondary-dark);
    padding-top: 4rem;
    border-radius: 5px;
    display: flex;
    gap: 1.2rem;
  }
`

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
export default CollabScreen;