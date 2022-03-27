import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import styled from "styled-components"

import { Input } from "../components/styled-components/Input"
import Message from "../components/styled-components/Message"
import device from "../screen_sizes/devices"
import {
  createComic,
  createPost,
  createPostReset,
} from "../actions/postActions"

const PostScreen = () => {
  const location = useLocation()
  const collabPost =
    location.state && location.state.post ? location.state.post : null

  const navigate = useNavigate()

  const [image, setImage] = useState(collabPost)
  const [post, setPost] = useState([collabPost])
  const [title, setTitle] = useState("")
  const [collaborators, setCollaborators] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")

  const [isComic, setIsComic] = useState(false)
  const [comicImages, setComicImages] = useState([])

  const [message, setMessage] = useState("")

  const createPostInfo = useSelector((state) => state.createPost)
  const { loading, postInfo, error } = createPostInfo

  const dispatch = useDispatch()

  const onImageChange = (e) => {
    if (!isComic && e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]))
      setPost([e.target.files[0]])
    } else if (isComic && e.target.files && e.target.files[0]) {
      setComicImages([])
      setPost([])
      Array.from(e.target.files).forEach((file) => {
        setComicImages((state) => [...state, URL.createObjectURL(file)])
        setPost((state) => [...state, file])
      })
    }
  }

  const dataURLtoFile = (dataurl, filename) => {
    filename = filename + "." + dataurl.split(";")[0].split("/")[1]

    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, { type: mime })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (image === null && comicImages.length < 1) {
      setMessage("No image is selected.")
      return
    }

    if (title.trim().length < 5 || title.trim().length > 15) {
      setMessage("Title should be between 5-15 characters.")
      return
    }

    if (description.trim().length > 100) {
      setMessage("Description should be less equal to 100 characters.")
      return
    }

    setMessage("")

    const data = new FormData()

    if (collabPost) {
      data.append("image", dataURLtoFile(post[0], title))
    } else if (isComic) {
      post.forEach((p) => {
        data.append("image", p)
      })
    } else {
      data.append("image", post[0])
    }

    data.append("title", title)
    data.append("collaborators", collaborators)
    data.append("description", description)
    data.append("tags", tags)

    if (isComic) {
      dispatch(createComic(data))
    } else {
      dispatch(createPost(data))
    }

    setPost(null)
    setImage(null)
    setTitle("")
    setCollaborators("")
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
      {loading && <Message>Creating Post...</Message>}
      {message && <Message variant="warning">{message}</Message>}
      {error && <Message variant="error">{error}</Message>}
      {postInfo && (
        <Message variant="success">Post Created Successfully</Message>
      )}
      <div className="center-container">
        <ImageContainer>
          {image ? (
            <img className="post" src={image} alt="post" />
          ) : isComic && comicImages.length > 0 ? (
            <ComicContainer>
              {comicImages.map((img) => (
                <img className="post" src={img} alt="post" />
              ))}
            </ComicContainer>
          ) : (
            <ImagePlaceHolder>
              <p className="no-post">No Image</p>
            </ImagePlaceHolder>
          )}
        </ImageContainer>
        <Form disabled={loading}>
          <ImageInputContainer>
            {!collabPost && (
              <Input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                multiple={isComic}
              />
            )}
          </ImageInputContainer>

          {!collabPost && (
            <CheckBox>
              <p>Is this a comic: </p>
              <Input
                type="checkbox"
                value={isComic}
                onChange={() => {
                  setPost([])
                  setImage(null)
                  setComicImages([])
                  setIsComic(!isComic)
                }}
              />
            </CheckBox>
          )}
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title*"
          />
          <TextAreaContainer>
            <TextArea
              rows="3"
              name="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              placeholder="Description"
            ></TextArea>
            <DescriptionCounter red={description.length > 100}>
              {description.length} of 100 characters
            </DescriptionCounter>
          </TextAreaContainer>
          <Input
            type="text"
            value={collaborators}
            onChange={(e) => setCollaborators(e.target.value)}
            placeholder="Add Collaborators (user1, user2,...)"
          />
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
  padding: 1rem 2rem 100px;
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
    background: var(--light);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`

const ComicContainer = styled.div`
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  height: 300px;

  padding: 1rem 0.5rem;
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
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 5px;
  background: var(--secondary-dark);
  color: var(--light);

  width: 100%;

  pointer-events: ${(props) => (props.disabled ? "none" : "")};
  opacity: ${(props) => (props.disabled ? "0.7" : "")};
  @media ${device.tablet} {
    width: 70%;
  }
`

const ImageInputContainer = styled.div`
  p {
    font-size: 0.8rem;
  }
`

const CheckBox = styled.div`
  display: flex;
  gap: 1rem;
`

const TextAreaContainer = styled.div`
  background: var(--light);
  border-radius: 5px;
`

const TextArea = styled.textarea`
  font-family: "Poppins";
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  outline: none;
  width: 100%;
`

const DescriptionCounter = styled.p`
  width: 100%;
  background: var(--light);
  border-radius: 5px;
  text-align: right;
  color: ${(props) => (props.red ? "red" : "green")};
  padding: 0 1rem;
  font-size: 0.8rem;
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
