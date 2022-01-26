import React, { useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { logout } from "../actions/userActions"
import device from "../screen_sizes/devices"

const Header = () => {
  const location = useLocation()
  const path = location.pathname.split("/")[1]

  const navigate = useNavigate()

  const [dropDownOpen, setDropDownOpen] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const navLinks = {
    Collab: "/collab",
    Activity: "/activity",
    Chat: "/chat",
  }

  const logoutHandler = () => {
    dispatch(logout())
    setDropDownOpen(false)
    navigate("/")
  }

  return (
    <>
      <Container userLoggedIn={userInfo ? "flex" : "none"}>
        <SubContainer>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>
              <LogoImage src="/images/logo/watermark.png" alt="logo" />
              <LogoTxt>MashArt</LogoTxt>
            </Logo>
          </Link>
          {userInfo && (
            <NavMenuContainer>
              <FontAwesomeIcon
                className="nav-icon"
                icon={dropDownOpen ? faTimes : faBars}
                size="2x"
                onClick={() => setDropDownOpen(!dropDownOpen)}
              />
              <NavMenu>
                {Object.entries(navLinks).map((obj) => {
                  return (
                    <li key={obj[0]}>
                      <Link to={obj[1]} style={{ textDecoration: "none" }}>
                        <LinkButton
                          className={
                            path === obj[0].toLowerCase() ? "active" : ""
                          }
                        >
                          {obj[0]}
                        </LinkButton>
                      </Link>
                    </li>
                  )
                })}
                <li>
                  <LinkButton onClick={logoutHandler}>Logout</LinkButton>
                </li>
              </NavMenu>
            </NavMenuContainer>
          )}
        </SubContainer>
      </Container>
      {userInfo && (
        <Dropdown className={`${dropDownOpen ? "active" : ""}`}>
          {Object.entries(navLinks).map((obj) => {
            return (
              <li key={obj[0]}>
                <Link to={obj[1]} style={{ textDecoration: "none" }}>
                  <LinkButton
                    className={
                      location.pathname.split("/")[1] === obj[0].toLowerCase()
                        ? "active"
                        : ""
                    }
                  >
                    {obj[0]}
                  </LinkButton>
                </Link>
              </li>
            )
          })}
          <li>
            <LinkButton onClick={logoutHandler}>Logout</LinkButton>
          </li>
        </Dropdown>
      )}
    </>
  )
}

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  background-color: var(--secondary);
  height: 80px;
  display: ${(props) => props.userLoggedIn};
  justify-content: center;
  align-items: center;
  color: var(--light);
  z-index: 100;

  @media ${device.tablet} {
    display: flex;
  }
`

const SubContainer = styled.div`
  width: 900px;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
`

const LogoImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  padding: 5px;
  margin-right: 16px;
`

const LogoTxt = styled.p`
  letter-spacing: 3px;
  font-size: 1.3rem;
  font-weight: 500;
  color: #ffefd7;
`

const NavMenuContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-item: center;
  .nav-icon {
    transition: 200ms ease-in-out;
    cursor: pointer;
  }

  @media ${device.tablet} {
    .nav-icon {
      display: none;
    }
  }
`

const NavMenu = styled.ul`
  list-style: none;
  display: none;
  flex: 1;

  li {
    cursor: pointer;
  }

  @media ${device.tablet} {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    flex-direction: row;
    position: static;
    background-color: transparent;

    li {
      margin: 0 0rem 0 3rem;
    }

    & li:hover {
      background-color: none;
      color: yellow;
    }
  }
`

const Dropdown = styled(NavMenu)`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: var(--secondary-light);
  top: -100%;
  width: 100%;
  height: 100vh;
  text-align: center;
  left: 0;
  transition: 400ms ease-in-out;

  z-index: 9;

  &.active {
    top: 80px;
    position: fixed;
  }

  & li:hover {
    background-color: var(--secondary);
  }

  @media ${device.tablet} {
    display: none;
  }
`

const LinkButton = styled.div`
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  color: var(--light);

  padding: 1rem 0;

  &.active {
    color: var(--background);
  }

  &:hover {
    color: var(--background);
  }

  @media ${device.tablet} {
    padding: 0;
  }
`

export default Header
