import React, { useState } from "react"
import styled from "styled-components"

import CollabTab from "../TabComponent/CollabTab"
import PostsTab from "../TabComponent/PostsTab"

const Tabs = () => {
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
      {/* Tab nav */}
      <NavMenu>
        <NavOption
          className={activeTab === "PostsTab" ? "active" : ""}
          onClick={handlePTab}
        >
          {" "}
          Posts{" "}
        </NavOption>
        <NavOption
          className={activeTab === "CollabTab" ? "active" : ""}
          onClick={handleCTab}
          side="right"
        >
          {" "}
          Collaborations
        </NavOption>
      </NavMenu>

      <div className="outlet">
        {activeTab === "CollabTab" ? <CollabTab /> : <PostsTab />}
      </div>
    </TabsContainer>
  )
}

const TabsContainer = styled.div`
  width: 90%;
  height: auto;
  min-height: 400px;
  margin: 0.25rem auto 1.5rem;
  padding: 2rem 1rem;
  color: #021216;
  border-radius: 2rem;
  @media (max-width: 769px) {
    padding: 2rem 0;
  }
`

const NavMenu = styled.ul`
  width: 60%;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #39a2db;
  border-radius: 2rem;

  @media (max-width: 768px) {
    width: 90%;
  }
`

const NavOption = styled.li`
  width: 50%;
  padding: 1rem;
  list-style: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.7s;

  border-bottom-left-radius: ${(props) =>
    props.side !== "right" ? "2rem" : "0"};
  border-top-left-radius: ${(props) => (props.side !== "right" ? "2rem" : "0")};
  border-bottom-right-radius: ${(props) =>
    props.side === "right" ? "2rem" : "0"};
  border-top-right-radius: ${(props) =>
    props.side === "right" ? "2rem" : "0"};

  &:hover {
    background: #007bbda2;
  }

  &.active {
    background: var(--secondary-light);
    font-weight: bold;
  }
`

export default Tabs
