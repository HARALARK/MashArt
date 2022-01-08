import {
  faBook,
  faHome,
  faSearch,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import device from "../screen_sizes/devices"

const Footer = () => {
  const location = useLocation()

  const path =
    location.pathname.split("/")[1] === ""
      ? "home"
      : location.pathname.split("/")[1]

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const tabLinks = {
    Home: ["/", faHome],
    Search: ["/search", faSearch],
    Comics: ["/comics", faBook],
    Profile: ["/profile", faUserCircle],
  }

  return userInfo ? (
    <Container>
      <TabMenu>
        {Object.entries(tabLinks).map((obj) => {
          return (
            <li key={obj[0]}>
              <Link
                className={`tab-link ${
                  path === obj[0].toLowerCase() ? "active" : ""
                }`}
                to={obj[1][0]}
              >
                <FontAwesomeIcon
                  className="tab-icon"
                  icon={obj[1][1]}
                  size="lg"
                />
                <TabLinkText>{obj[0]}</TabLinkText>
              </Link>
            </li>
          )
        })}
      </TabMenu>
    </Container>
  ) : (
    <></>
  )
}

const Container = styled.footer`
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: center;
  bottom: 0;
  left: 0;
  background-color: #24003e;
  height: 80px;
`

const TabMenu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 900px;
  list-style: none;

  padding: 0 2rem;

  .tab-link {
    text-decoration: none;
    color: #fff;
    padding: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  .tab-icon {
    font-size: 1.5rem;
  }

  .tab-link.active {
    color: #ffb800;
  }

  .tab-link:hover {
    color: #ffb800;
  }
`

const TabLinkText = styled.p`
  display: none;
  font-weight: 600;

  @media ${device.tablet} {
    display: flex;
  }
`

export default Footer
