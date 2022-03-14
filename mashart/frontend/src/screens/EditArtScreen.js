import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import device from "../screen_sizes/devices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorOpen, faSave } from "@fortawesome/free-solid-svg-icons"
import { useLocation, useNavigate } from "react-router-dom"
import { Input } from "../components/styled-components/Input"
import Board from "../components/Board/Board"

const EditArtScreen = () => {
  const location = useLocation()
  const postPath =
    location.state && location.state.path ? location.state.path : null

  const navigate = useNavigate()

  const [image, setImage] = useState(postPath)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
  }, [userInfo, navigate])

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <div>
      <Container>
        <CollabContainer>
          <p className="owner">{userInfo.username}'s Room</p>
          <Header>
            <RoomContainer>
              <p className="room-code-txt">Room Code:</p>
              <p className="room-code">ABC123</p>
            </RoomContainer>

            <CollaboratorContainer>
              <img
                className="collaborator"
                src="/images/logo/logo.png"
                alt="collaborator1"
              />
              <img
                className="collaborator"
                src="/images/logo/logo.png"
                alt="collaborator2"
              />
              <img
                className="collaborator"
                src="/images/logo/logo.png"
                alt="collaborator3"
              />
            </CollaboratorContainer>
          </Header>

          <ImageInputContainer>
            <p>Upload an Image:</p>
            <Input
              type="file"
              padding={"0"}
              accept="image/*"
              onChange={onImageChange}
            />
          </ImageInputContainer>

          <ImgDescContainer>
            <CanvasContainer>
              <Board />
            </CanvasContainer>

            <DescContainer>
              <TextArea
                rows="3"
                name="text"
                placeholder="Description"
              ></TextArea>
              <ButtonsContainer>
                <Button className="save-room">
                  Save Post
                  <FontAwesomeIcon
                    icon={faSave}
                    className="icon"
                    size="sm"
                    style={{ color: "white" }}
                  />
                </Button>
                <Button className="leave-room">
                  Leave Room
                  <FontAwesomeIcon
                    icon={faDoorOpen}
                    className="icon"
                    size="sm"
                    style={{ color: "white" }}
                  />
                </Button>
              </ButtonsContainer>
            </DescContainer>
          </ImgDescContainer>
        </CollabContainer>
      </Container>
    </div>
  )
}

const Container = styled.div`
  padding: 1rem 0rem 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
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
    padding: 1rem 2rem 100px;
    justify-content: space-between;
    overflow: visible;
   
`

const CollabContainer = styled.div`
  background-color: #0078b7;
  width: 100%;
  padding: 1rem;
  border-radius: 5px;

  .owner {
    text-align: center;
    font-size: 2rem;
    color: #fff;
    font-weight: 500;
  }
`

const Header = styled.section`
  background-color: var(--secondary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  border-radius: 5px;
  color: var(--light);

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .room-code-txt {
    font-size: 1rem;
  }

  .room-code {
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 2px;
    line-height: 90%;
  }
`

const CollaboratorContainer = styled.div`
  display: flex;
  gap: 1rem;

  .collaborator {
    height: 50px;
    width: 50px;
    background-color: white;
    border-radius: 5px;
  }
`

const ImageInputContainer = styled.div`
  color: #fff;
  padding: 1rem 0;
`

const ImgDescContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${device.tablet} {
    flex: 1.5;
  }
`

const DescContainer = styled.div`
  flex: 1;
`

const TextArea = styled.textarea`
  font-family: "Poppins";
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  outline: none;
  width: 100%;
  height: 300px;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  padding: 1rem 0;
`

const Button = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 1rem;
  color: var(--light);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  transition: 100ms ease-in-out;

  .icon {
    margin-left: 0.8rem;
  }

  &.leave-room {
    background-color: #bc0505;

    &:hover {
      background-color: #990000;
    }
  }

  &.save-room {
    background-color: var(--secondary);

    &:hover {
      background-color: var(--secondary-dark);
    }
  }
`
export default EditArtScreen
