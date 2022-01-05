import React, { useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { logout } from "../actions/userActions"
import device from "../screen_sizes/devices"

const Header = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const navLinks = {
    Home: "/",
    Profile: "/profile",
    Collab: "/collab",
  }

  const logoutHandler = () => {
    dispatch(logout())
    setDropDownOpen(false)
  }

  return (
    <>
      <Container userLoggedIn={userInfo ? "flex" : "none"}>
        <SubContainer>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>
              <LogoImage src="/images/logo/logo.png" alt="logo" />
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
                    <li key={obj[0]} onClick={() => console.log("clicked")}>
                      <Link to={obj[1]} style={{ textDecoration: "none" }}>
                        <LinkButton>{obj[0]}</LinkButton>
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
                  <LinkButton>{obj[0]}</LinkButton>
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
  background-color: #24003e;
  height: 80px;
  display: ${(props) => props.userLoggedIn};
  justify-content: center;
  align-items: center;
  color: #fff;
  position: sticky;
  z-index: 100;

  @media ${device.tablet} {
    display: flex;
  }
`

const SubContainer = styled.div`
  width: 1200px;
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
  height: 45px;
  width: 45px;
  background-color: #ffe6aa;
  border-radius: 15px;
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
      width: 70px;
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
  background-color: #381452;
  top: -100%;
  width: 100%;
  text-align: center;
  left: 0;
  transition: 400ms ease-in-out;

  z-index: 9;

  &.active {
    top: 80px;
  }

  & li:hover {
    background-color: #2f1145;
  }

  @media ${device.tablet} {
    display: none;
  }
`

const LinkButton = styled.div`
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 15px;
  cursor: pointer;
  color: #fff;

  padding: 1rem 0;

  &:hover {
    color: #ffb800;
  }

  @media ${device.tablet} {
    padding: 0;
  }
`

export default Header
