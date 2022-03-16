import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import device from "../screen_sizes/devices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorOpen, faSave } from "@fortawesome/free-solid-svg-icons"
import { useLocation, useNavigate } from "react-router-dom"
import { Input } from "../components/styled-components/Input"
import io from "socket.io-client"
import Message from "../components/styled-components/Message"
import { getCollabUsers, leaveCollab } from "../actions/collabActions"
import Compressor from "compressorjs"

const EditArtScreen = () => {
  const location = useLocation()
  const postPath =
    location.state && location.state.content ? location.state.content : null

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const collabInfo = useSelector((state) => state.collab)
  const { loading, collab, leave, error } = collabInfo

  const collabUsers = useSelector((state) => state.collabUsers)
  const { loading: loadingUsers, users, error: errorUsers } = collabUsers

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
  }, [userInfo, navigate])

  const canvasRef = useRef(null)
  const socket = useRef()
  const roomCode = useRef()
  const content = useRef(postPath)

  useEffect(() => {
    if (collab) {
      roomCode.current = collab.roomCode
    }
    if (leave) {
      if (location.key !== "default") {
        navigate(-1)
      } else {
        navigate("/collab")
      }
    }
  }, [collab, leave, navigate, location])

  useEffect(() => {
    if (!users) {
      dispatch(getCollabUsers(roomCode.current))
    }

    if (socket.current) {
      socket.current.on("get-users", () => {
        console.log("get users")
        dispatch(getCollabUsers(roomCode.current))
      })
    }
  }, [users, dispatch])

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      new Compressor(e.target.files[0], {
        width: 300,
        height: 300,
        success(result) {
          const reader = new FileReader()
          reader.onload = function () {
            const base64 = this.result
            socket.current.emit("image-updated", {
              roomCode: roomCode.current,
              image: base64,
            })
          }
          reader.readAsDataURL(result)
        },
      })
    }
  }

  const leaveRoomHandler = () => {
    dispatch(leaveCollab(roomCode.current))
    socket.current.emit("leave-room", { roomCode: roomCode.current })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    canvas.height = 300
    canvas.width = 300

    const color = document.getElementById("color")
    // set the current color
    const current = {
      color: "#000000",
    }

    const onColorChange = (e) => {
      current.color = e.target.value
    }

    color.addEventListener("change", onColorChange, false)
    let drawing = false

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath()
      context.moveTo(x0, y0)
      context.lineTo(x1, y1)
      context.strokeStyle = color
      context.lineWidth = 2
      context.stroke()
      context.closePath()

      if (!emit) {
        return
      }
      const w = canvas.width
      const h = canvas.height

      socket.current.emit("drawing", {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
        roomCode: roomCode.current,
      })
    }

    const onPointerDown = (e) => {
      e.preventDefault()
      e.stopPropagation()

      drawing = true

      current.x = (e.pageX || e.touches[0].pageX) - canvas.offsetLeft
      current.y = (e.pageY || e.touches[0].pageY) - canvas.offsetTop
    }

    const onPointerMove = (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (!drawing) {
        return
      }
      drawLine(
        current.x,
        current.y,
        (e.pageX || e.touches[0].pageX) - canvas.offsetLeft,
        (e.pageY || e.touches[0].pageY) - canvas.offsetTop,
        current.color,
        true
      )
      current.x = (e.pageX || e.touches[0].pageX) - canvas.offsetLeft
      current.y = (e.pageY || e.touches[0].pageY) - canvas.offsetTop
    }

    const onPointerUp = (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (!drawing) {
        return
      }
      drawing = false
      drawLine(
        current.x,
        current.y,
        (e.pageX || e.changedTouches[e.changedTouches.length - 1].pageX) -
          canvas.offsetLeft,
        (e.pageY || e.changedTouches[e.changedTouches.length - 1].pageY) -
          canvas.offsetTop,
        current.color,
        true
      )
    }

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime()
      return function () {
        const time = new Date().getTime()

        if (time - previousCall >= delay) {
          previousCall = time
          callback.apply(null, arguments)
        }
      }
    }

    canvas.addEventListener("mousedown", onPointerDown, false)
    canvas.addEventListener("mouseup", onPointerUp, false)
    canvas.addEventListener("mouseout", onPointerUp, false)
    canvas.addEventListener("mousemove", throttle(onPointerMove, 10), false)

    // Touch support for mobile devices
    canvas.addEventListener("touchstart", onPointerDown, false)
    canvas.addEventListener("touchend", onPointerUp, false)
    canvas.addEventListener("touchcancel", onPointerUp, false)
    canvas.addEventListener("touchmove", throttle(onPointerMove, 10), false)

    const onDrawingEvent = (data) => {
      const w = canvas.width
      const h = canvas.height
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color)
    }

    const updateCanvas = (imageData) => {
      drawImage(imageData)
    }

    const scaleToFitDrawImage = (url) => {
      const img = new Image()
      img.src = url
      // get the scale
      var scale = Math.min(canvas.width / img.width, canvas.height / img.height)
      // get the top left position of the image
      var x = canvas.width / 2 - (img.width / 2) * scale
      var y = canvas.height / 2 - (img.height / 2) * scale
      context.drawImage(img, x, y, img.width * scale, img.height * scale)
    }

    const drawImage = (url) => {
      const image = new Image()
      image.src = url
      image.onload = () => {
        context.drawImage(image, 0, 0)
      }
    }

    const getCanvas = async () => {
      const imageData = await canvas.toDataURL()

      socket.current.emit("updated-canvas", {
        roomCode: roomCode.current,
        imageData,
      })
    }

    if (content.current) {
      scaleToFitDrawImage(content.current)
      // to make sure the canvas updates and generates an image
      context.beginPath()
      context.moveTo(0, 0)
      context.lineTo(0, 0)
      context.strokeStyle = color
      context.lineWidth = 0
      context.stroke()
      context.closePath()
      content.current = null
    }

    socket.current = io.connect("/")
    socket.current.emit("join-room", { roomCode: roomCode.current })

    socket.current.on("get-image", drawImage)
    socket.current.on("get-canvas", getCanvas)
    socket.current.on("update-canvas", updateCanvas)
    socket.current.on("drawing", onDrawingEvent)
  }, [])

  return (
    <Container>
      {loading && <Message>Loading...</Message>}
      {error && <Message variant="error">{error}</Message>}
      {collab && (
        <CollabContainer>
          <p className="owner">
            {collab.hostId && collab.hostId.username
              ? collab.hostId.username
              : userInfo.username}
            's Room
          </p>
          <Header>
            <RoomContainer>
              <p className="room-code-txt">Room Code:</p>
              <p className="room-code">{collab.roomCode}</p>
            </RoomContainer>

            <CollaboratorContainer>
              {loadingUsers && <Message>Loading...</Message>}
              {errorUsers && <Message variant="error">{errorUsers}</Message>}
              {users ? (
                users.users.map((user) => (
                  <img
                    key={user._id}
                    className="collaborator"
                    src={
                      user.profileImage.imageSrc
                        ? user.profileImage.imageSrc
                        : "/images/logo/logo.png"
                    }
                    alt="collaborator1"
                  />
                ))
              ) : (
                <></>
              )}
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
              <Whiteboard ref={canvasRef} className="whiteboard" />
              <ColorsContainer>
                <p>Pick a color:</p>
                <input type="color" id="color" />
              </ColorsContainer>
            </CanvasContainer>

            <DescContainer>
              <TextArea
                rows="3"
                name="text"
                placeholder="Description"
              ></TextArea>
              <ButtonsContainer>
                {collab.hostId === userInfo._id && (
                  <Button className="save-room">
                    Save Post
                    <FontAwesomeIcon
                      icon={faSave}
                      className="icon"
                      size="sm"
                      style={{ color: "white" }}
                    />
                  </Button>
                )}
                <Button className="leave-room" onClick={leaveRoomHandler}>
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
      )}
    </Container>
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

const Whiteboard = styled.canvas`
  border-radius: 5px;
  background: var(--light);
  width: 300px;
  height: 300px;
`

const ColorsContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: var(--secondary);
  padding: 1rem;
  margin: 1rem 0 0;
  border-radius: 5px;
  align-items: center;
  gap: 1rem;
  color: var(--light);
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
