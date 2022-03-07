import React, { useEffect, useState } from "react"
import styled from "styled-components"
import device from "../screen_sizes/devices"
import { Input, PasswordInput } from "../components/styled-components/Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  resetUserDetails,
  resetUserProfile,
  updateUserProfile,
} from "../actions/userActions"
import Message from "../components/styled-components/Message"

const EditProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.userLogin)
  const { userInfo } = user

  const updateUser = useSelector((state) => state.userUpdateProfile)
  const { loading, userLogin, error } = updateUser

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
    if (userLogin) {
      dispatch(resetUserDetails())
      dispatch(resetUserProfile())
    }
  }, [userInfo, navigate, userLogin, dispatch])

  const onImageChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      if (type === "profile") {
        setProfileImage(e.target.files[0])
      }
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append("profileImage", profileImage)
    data.append("username", username)
    data.append("password", password)

    dispatch(updateUserProfile(data))

    setProfileImage(null)
    setUsername("")
    setPassword("")
  }

  return (
    <Container>
      {loading && <Message>Loading...</Message>}
      {error && <Message variant="error">{error}</Message>}
      {message && <Message variant="error">{message}</Message>}
      {userLogin && (
        <Message variant="success">Profile Updated Successfully</Message>
      )}
      <Form>
        <p className="heading">Edit Profile </p>
        <InputContainer>
          <p> Change Profile Photo</p>
          <ImageContainer size="80px">
            {profileImage ? (
              <img
                className="post"
                src={URL.createObjectURL(profileImage)}
                alt="post"
              />
            ) : (
              <ImagePlaceHolder size="80px">
                <p className="no-post">No Image</p>
              </ImagePlaceHolder>
            )}
          </ImageContainer>
          <ImageInputContainer>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => onImageChange(e, "profile")}
              padding="0.7rem 0"
            />
          </ImageInputContainer>
        </InputContainer>

        <InputContainer>
          <p>Change Username</p>
          <div>
            <Input
              width="100%"
              type="text"
              placeholder="Change Username*"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </InputContainer>

        <InputContainer>
          <p>Change Password</p>
          <PasswordInputContainer>
            <PasswordInput
              type={showPassword ? "text" : "password"}
              placeholder="Change Password*"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="icon-container"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
              ></FontAwesomeIcon>
            </div>
          </PasswordInputContainer>
        </InputContainer>

        <SubmitButton type="button" value="Save" onClick={submitHandler} />
      </Form>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  .design-container {
    display: none;
  }

  .heading {
    font-size: 2rem;
  }

  @media ${device.tablet} {
    gap: 2rem;
  }

  padding: 1rem 0 80px;
`

const Form = styled.form`
  width: 100%;
  padding: 1rem 2rem 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InputContainer = styled.div``

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  .post {
    height: ${(prop) =>
      prop.size ? prop.size : prop.height ? prop.height : "300px"};
    width: ${(prop) =>
      prop.size ? prop.size : prop.width ? prop.width : "300px"};
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`

const ImagePlaceHolder = styled.div`
  background: var(--secondary-light);
  opacity: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(prop) =>
    prop.size ? prop.size : prop.height ? prop.height : "300px"};
  width: ${(prop) =>
    prop.size ? prop.size : prop.width ? prop.width : "300px"};
  border-radius: 5px;

  .no-post {
    color: var(--light);
    font-size: 1rem;
  }
`

const SubmitButton = styled(Input)`
  background-color: var(--secondary);
  color: var(--light);
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background-color: var(--secondary-dark);
  }
`

const PasswordInputContainer = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 5px;

  .icon-container {
    padding: 0.4rem;
    cursor: pointer;

    color: var(--grey-dark);

    &:hover {
      color: var(--dark);
    }
  }
`

const ImageInputContainer = styled.div`
  p {
    font-size: 0.8rem;
  }
`
export default EditProfileScreen
