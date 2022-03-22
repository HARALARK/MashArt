import React, { useState } from "react"
import styled from "styled-components"
import device from "../../screen_sizes/devices"

const Tabs = ({ posts }) => {
  const [activeTab, setActiveTab] = useState("CollabTab")

  const handleCTab = () => {
    //Updates the state to collab history tab
    setActiveTab("CollabTab")
  }

  const handlePTab = () => {
    //Updates state to post history tab
    setActiveTab("PostsTab")
  }

  return (
    <TabsContainer>
      {/* <NavMenu>
        <NavOption
          className={activeTab === "PostsTab" ? "active" : ""}
          onClick={handlePTab}
        >
          Posts
        </NavOption>
        <NavOption
          className={activeTab === "CollabTab" ? "active" : ""}
          onClick={handleCTab}
          side="right"
        >
          Collaborations
        </NavOption>
      </NavMenu> */}
      <PostContainer>
        {posts?.map((post) => (
          <Post key={post._id} src={post.path} />
        ))}
      </PostContainer>
    </TabsContainer>
  )
}

const TabsContainer = styled.div`
  width: 100%;
  padding: 1rem 2rem 80px;
  color: var(--primary-dark);
`

const NavMenu = styled.ul`
  display: flex;
  border: 2px solid var(--secondary-light);
  border-radius: 5px;
  margin: 0 0 1rem;
`

const NavOption = styled.li`
  flex: 1;
  padding: 1rem;
  list-style: none;
  text-align: center;
  cursor: pointer;
  transition: all 100ms;
  color: var(--dark);

  &:hover {
    background: #007bbda2;
  }

  &.active {
    background: var(--secondary-light);
    font-weight: bold;
    color: var(--light);
  }
`

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`

const Post = styled.img`
  width: 100%;
  height: 300px;
  background: var(--light);

  @media ${device.tablet} {
    width: calc(50% - 5px);
  }
`

export default Tabs
