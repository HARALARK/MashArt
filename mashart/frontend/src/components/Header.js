import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { logout } from "../actions/userActions"
import device from "../screen_sizes/devices"

const Header = () => {
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
  }

  return (
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
            <FontAwesomeIcon className="nav-icon" icon={faBars} size="2x" />
            <NavMenu>
              {Object.entries(navLinks).map((obj) => {
                return (
                  <li key={obj[0]}>
                    <LinkButton href={obj[1]}>{obj[0]}</LinkButton>
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
  )
}

const Container = styled.div`
  background-color: #24003e;
  height: 80px;
  display: ${(props) => props.userLoggedIn};
  justify-content: center;
  align-items: center;
  color: #fff;

  @media ${device.tablet} {
    display: flex;
  }
`

const SubContainer = styled.div`
  width: 1200px;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
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
    margin: 0 0 0 3rem;
  }

  @media ${device.tablet} {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

const LinkButton = styled.a`
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 15px;
  cursor: pointer;
`

export default Header
