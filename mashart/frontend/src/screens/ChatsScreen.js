import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import styled from "styled-components"
import device from "../screen_sizes/devices"
import { Input } from "../components/styled-components/Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const ChatsScreen = () => {
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [chatMessage, setChatMessage] = useState("")
  const [messages, setMessages] = useState([])

  const [option, setOption] = useState("users")

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
  })

  const sendChatMessageHandler = () => {
    if (chatMessage.trim().length !== 0) {
      setMessages([
        ...messages,
        { username: userInfo.username, message: chatMessage },
      ])
      setChatMessage("")
    }
  }

  return (
    <Container>
      <ChatContainer>
        <Heading>
          <span className="heading">Chats</span>
          <FontAwesomeIcon
            icon={faComments}
            size="XL"
            style={{ color: "white" }}
          />
        </Heading>

        <OptionContainer>
          <Button
            className={option === "users" && "active"}
            onClick={() => setOption("users")}
          >
            Users
          </Button>
          <Button
            className={option === "chat" && "active"}
            onClick={() => setOption("chat")}
          >
            Chat
          </Button>
        </OptionContainer>

        <SubContainer>
          <UsersContainer hide={!(option === "users")}>
            <User>
              <img
                className="profilePicture"
                src="/images/logo/logo.png"
                alt="profilepic"
              />
              <UserInfo>
                <p className="username">Elizabeth</p>
              </UserInfo>
            </User>
            <User>
              <img
                className="profilePicture"
                src="/images/logo/logo.png"
                alt="profilepic"
              />
              <UserInfo>
                <p className="username">Elizabeth</p>
              </UserInfo>
            </User>
          </UsersContainer>

          <MessageInfoContainer hide={!(option === "chat")}>
            <User active>
              <img
                className="profilePicture"
                src="/images/logo/logo.png"
                alt="profilepic"
              />
              <UserInfo>
                <p className="username">Elizabeth</p>
              </UserInfo>
            </User>
            <MessageContainer>
              <ChatScreen>
                {messages.map((data, index) => {
                  const isUser = userInfo.username === data.username
                  return (
                    <ChatMessage key={index} className={isUser ? "active" : ""}>
                      {!isUser && <h3 className="username">{data.username}</h3>}
                      <p className="message">{data.message}</p>
                    </ChatMessage>
                  )
                })}
              </ChatScreen>
              <SendMessage>
                <Input
                  type="text"
                  placeholder="Type here..."
                  flex={1}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <SendButton onClick={sendChatMessageHandler}>
                  <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                </SendButton>
              </SendMessage>
            </MessageContainer>
          </MessageInfoContainer>
        </SubContainer>
      </ChatContainer>
    </Container>
  )
}

const Container = styled.div`
  height: calc(100vh - 160px);
  display: flex;
  padding: 1rem 2rem;
`

const ChatContainer = styled.section`
  background: #0077b6;
  width 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding 1rem;
`

const Heading = styled.section`
  align-items: center;
  border-radius: 5px;
  padding 0.8rem 0;
  background-color: #023e8a;
  color: var(--light);
  font-size: 2rem;
  text-align: center;
  font-weight: 500;

  .heading{
    padding: 0 0.5rem;
  }
`

const OptionContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media ${device.tablet} {
    display: none;
  }
`

const Button = styled.p`
  flex: 1;
  text-align: center;
  padding: 0.5rem 1rem;
  border: 3px solid var(--secondary-dark);
  color: var(--secondary-dark);
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 100ms ease-in-out;
  margin-top: 0.5rem;

  &.active {
    background-color: var(--secondary-dark);
    color: var(--light);
  }

  &:hover {
    background-color: var(--secondary-dark);
    color: var(--light);
  }
`

const SubContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  padding: 0.5rem 0;

  @media ${device.tablet} {
    gap: 1rem;
    flex-direction: row;
    justify-content: space-between;
  }
`

const UsersContainer = styled.section`
  flex: 1;
  display: ${(props) => (props.hide ? "none" : "flex")};
  flex-direction: column;
  border-radius: 5px;
  gap: 0.5rem;

  overflow-y: scroll;

  @media ${device.tablet} {
    display: flex;
  }
`

const User = styled.section`
  display: flex;
  align-items: center;
  width: 100%;

  gap: 0.8rem;
  border-radius: ${(props) => (props.active ? "5px 5px 0 0" : "5px")};
  background-color: ${(props) =>
    props.active ? "var(--secondary-dark)" : "var(--primary-dark)"};
  color: ${(props) => (props.active ? "var(--light)" : "")};
  padding: 0.5rem;

  margin-bottom: ${(props) => (props.active ? "1rem" : "")};

  .profilePicture {
    height: 30px;
    width: 30px;
    background-color: var(--light);
    border-radius: 5px;
  }
`

const UserInfo = styled.section`
  flex: 1;
  .username {
    font-weight: 600;
  }
`
const MessageInfoContainer = styled.section`
  flex: 1;
  display: ${(props) => (props.hide ? "none" : "flex")};
  flex-direction: column;
  border-radius: 5px;
  background: var(--primary);

  @media ${device.tablet} {
    display: flex;
  }
`

const MessageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 0 1rem 0.5rem;
  background: var(--primary);
`

const ChatScreen = styled.div`
  flex: 1;
  overflow-y: scroll;
  margin-bottom: 0.5rem;
`

const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--grey-light);
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0 1rem 0.5rem 0;

  &.active {
    background: var(--primary-dark);
  }

  .username {
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  .message {
    font-size: 0.8rem;
  }
`

const SendMessage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 5px;
  background: var(--primary-dark);
`

const SendButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--primary-light);
  background: var(--secondary-dark);
  padding: 0.6rem;
  border-radius: 5px;
  margin-left: 0.5rem;
  cursor: pointer;

  &:hover {
    background: var(--secondary);
  }
`

export default ChatsScreen
