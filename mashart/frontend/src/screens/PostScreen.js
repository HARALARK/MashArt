import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import styled from "styled-components"

import { Input } from "../components/styled-components/Input"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"
import { createPost, createPostReset } from "../actions/postActions"

const PostScreen = () => {
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const [post, setPost] = useState(null)
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")

  const [message, setMessage] = useState("")

  const createPostInfo = useSelector((state) => state.createPost)
  const { loading, postInfo, error } = createPostInfo

  const dispatch = useDispatch()

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]))
      setPost(e.target.files[0])
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (image === null) {
      setMessage("No image is selected.")
      return
    }

    if (title.trim().length < 5) {
      setMessage("Title should be more than 5 characters.")
      return
    }

    setMessage("")

    const data = new FormData()
    data.append("image", post)
    data.append("title", title)
    data.append("subtitle", subtitle)
    data.append("description", description)
    data.append("tags", tags)

    dispatch(createPost(data))

    setPost(null)
    setImage(null)
    setTitle("")
    setSubtitle("")
    setDescription("")
    setTags("")
  }

  useEffect(() => {
    if (postInfo) {
      dispatch(createPostReset())
      navigate("/")
    }
  }, [postInfo, dispatch, navigate])

  return (
    <Container>
      {loading && <Message>Loading</Message>}
      {message && <Message variant="warning">{message}</Message>}
      {error && <Message variant="error">{error}</Message>}
      {postInfo && (
        <Message variant="success">Post Created Successfully</Message>
      )}
      <div className="center-container">
        <ImageContainer>
          {image ? (
            <img className="post" src={image} alt="post" />
          ) : (
            <ImagePlaceHolder>
              <p className="no-post">No Image</p>
            </ImagePlaceHolder>
          )}
        </ImageContainer>
        <Form>
          <ImageInputContainer>
            <Input type="file" accept="image/*" onChange={onImageChange} />
          </ImageInputContainer>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title*"
          />
          <Input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle"
          />
          <TextArea
            rows="3"
            name="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></TextArea>
          <Input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags"
          />
          <Button onClick={submitHandler}>Create Post</Button>
        </Form>
      </div>
    </Container>
  )
}

const Container = styled.section`
  padding: 1rem 2rem 80px;
  height: 100%;

  .center-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
`

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .post {
    height: 300px;
    width: 300px;
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
  height: 300px;
  width: 300px;
  border-radius: 5px;

  .no-post {
    color: var(--light);
    font-size: 1.5rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 100px;

  @media ${device.tablet} {
    width: 70%;
  }
`

const ImageInputContainer = styled.div`
  p {
    font-size: 0.8rem;
  }
`

const TextArea = styled.textarea`
  font-family: "Poppins";
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  outline: none;
`

const Button = styled.p`
  text-align: center;
  padding: 0.5rem 1rem;
  background-color: var(--primary-dark);
  color: var(--light);
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 100ms ease-in-out;
  margin-top: 0.8rem;

  &:hover {
    background-color: var(--secondary-light);
  }
`

export default PostScreen
