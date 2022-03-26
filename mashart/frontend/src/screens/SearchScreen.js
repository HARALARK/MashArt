import React, { useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"

import Message from "../components/styled-components/Message"
import { Input } from "../components/styled-components/Input"
import UserCard from "../components/UserCard/UserCard"
import { searchUser } from "../actions/userActions"
import { searchPost } from "../actions/postActions"

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("")
  const [option, setOption] = useState("people")

  const searchUserInfo = useSelector((state) => state.searchUser)
  let { loading, usersInfo, error } = searchUserInfo

  const searchPostInfo = useSelector((state) => state.searchPost)
  let { postsInfo } = searchPostInfo

  const dispatch = useDispatch()

  const searchHandler = (e) => {
    setSearchText(e.target.value)

    if (e.target.value.trim() === "") {
      usersInfo.users = []
      return
    }

    if (option === "people") {
      dispatch(searchUser(e.target.value))
    } else if (option === "posts") {
      dispatch(searchPost(e.target.value))
    }
  }

  return (
    <Container>
      <InputContainer>
        <Input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={searchHandler}
        />
        <OptionContainer>
          <Button
            className={option === "people" && "active"}
            onClick={() => setOption("people")}
          >
            People
          </Button>
          <Button
            className={option === "posts" && "active"}
            onClick={() => setOption("posts")}
          >
            Posts
          </Button>
        </OptionContainer>
      </InputContainer>
      <ResultCardContainer hide={!(option === "people")}>
        {loading && <Message>{loading}</Message>}
        {error && <Message variant="error">{error}</Message>}
        {option === "people" && usersInfo && usersInfo.users.length > 0 ? (
          usersInfo.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <></>
        )}
        {option === "post" && postsInfo && postsInfo.posts.length > 0 ? (
          postsInfo.posts.map((post) => <UserCard key={post._id} post={post} />)
        ) : (
          <></>
        )}
      </ResultCardContainer>
    </Container>
  )
}

const Container = styled.section`
  padding: 1rem 2rem;
  height: 90%;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const OptionContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const ResultCardContainer = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
  flex-direction: column;

  margin-top: 1rem;
  padding-bottom: 3rem;
  gap: 0.5rem;

  overflow-y: scroll;
  overscroll-behaviour: contain;
  height: calc(100vh - 250px);

  .user-link {
    text-decoration: none;
  }
`

const Button = styled.p`
  flex: 1;
  text-align: center;
  padding: 0.5rem 1rem;
  border: 3px solid var(--secondary);
  color: var(--secondary);
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 200ms ease-in-out;
  margin-top: 1rem;

  &.active {
    background-color: var(--secondary);
    color: var(--light);
  }

  &:hover {
    background-color: var(--secondary);
    color: var(--light);
  }
`
export default SearchScreen
