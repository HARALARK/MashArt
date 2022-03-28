import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import device from "../screen_sizes/devices"

import { useNavigate } from "react-router-dom"
import { getComics } from "../actions/postActions"
import Message from "../components/styled-components/Message"
import ComicCard from "../components/ComicCard/ComicCard"

const ComicsScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [readerPopUp, setReaderPopUp] = useState(false)
  const [comic, setComic] = useState(null)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const comicsInfo = useSelector((state) => state.comics)
  const { loading, comics, error } = comicsInfo

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
    if (!comics) {
      dispatch(getComics())
    }
  }, [userInfo, navigate, comics, dispatch])

  return (
    <Container>
      <Header>
        <CustomImage>
          <img
            className="comicPicture1"
            src="/images/comics/boom.png"
            alt="boomcomic"
          />
          <img
            className="comicPicture2"
            src="/images/comics/cloud.png"
            alt="cloudcomic"
          />
        </CustomImage>

        <Info>
          <p className="title">Comic Collaborate</p>
          <p className="description">
            Make your own, join or read comics you desire, anytime, anywhere.
          </p>
        </Info>

        <CustomImage>
          <img
            className="comicPicture3"
            src="/images/comics/zap.png"
            alt="zapcomic"
          />
          <img
            className="comicPicture4"
            src="/images/comics/thunder.png"
            alt="thundercomic"
          />
        </CustomImage>
      </Header>
      {loading && <Message>Loading...</Message>}
      {error && <Message variant="error">{error}</Message>}

      {comics && (
        <ComicsContainer>
          {comics?.comics.map((comic, index) => (
            <ComicCard
              key={index}
              comic={comic}
              setComic={setComic}
              setReaderPopUp={setReaderPopUp}
            />
          ))}
        </ComicsContainer>
      )}

      <BackgroundBlock
        hide={!readerPopUp}
        onClick={() => {
          setReaderPopUp(false)
          setComic(null)
        }}
      >
        <PopUpContainer>
          <PopUp
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {comic && comic.path.length > 0 ? (
              <>
                <p className="heading">{comic.title}</p>
                <PostsContainer>
                  {comic.path.map((page, index) => (
                    <ImageContainer key={index}>
                      <img className="post" src={page} alt="page" />
                    </ImageContainer>
                  ))}
                </PostsContainer>
              </>
            ) : (
              <p className="no-posts">No Comic Selected</p>
            )}
          </PopUp>
        </PopUpContainer>
      </BackgroundBlock>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 100px;
  align-items: center;
  justify-content: center;
`
const Header = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
  background-color: var(--secondary-dark);
  border-radius: 5px;
  color: var(--light);

  margin-bottom: 1rem;
`

const Info = styled.div`
  .title {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 700;
  }

  .description {
    display: none;
  }

  @media ${device.tablet} {
    .title {
      font-size: 2rem;
      text-align: center;
      align-items: center;
      font-weight: 700;
    }

    .description {
      display: block;
      text-align: center;
    }
  }
`

const CustomImage = styled.div`
  position: relative;

  .comicPicture1 {
    height: 75px;
    width: 75px;
  }
  .comicPicture2 {
    position: absolute;
    top: 45px;
    left: 25px;
    height: 37px;
    width: 52px;
  }
  .comicPicture3 {
    height: 67px;
    width: 67px;
  }
  .comicPicture4 {
    position: absolute;
    left: 25px;
    height: 67px;
    width: 67px;
  }

  @media ${device.tablet} {
    .comicPicture1 {
      height: 100px;
      width: 100px;
    }
    .comicPicture2 {
      position: absolute;
      top: 60px;
      left: 25px;
      height: 50px;
      width: 70px;
    }
    .comicPicture3 {
      height: 90px;
      width: 90px;
    }
    .comicPicture4 {
      position: absolute;
      left: 25px;
      height: 90px;
      width: 90px;
    }
  }
`

const ComicsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`

const BackgroundBlock = styled.div`
  display: ${(props) => (props.hide ? "none" : "")};
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(77, 90, 135, 0.8);
  width: 100%;
  height: 100%;
`

const PopUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const PopUp = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
  background: var(--dark);
  min-height: 230px;
  max-height: 300px;

  color: var(--light);

  justify-content: center;
  align-items: center;
  padding: 1rem 2rem 2rem;
  flex-direction: column;
  border-radius: 5px;

  .heading {
    text-align: left;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .no-posts {
    color: var(--light);
    padding-bottom: 1rem;
  }

  @media ${device.tablet} {
    max-height: 400px;
  }
`

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--grey-light);

  .post {
    width: 300px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  @media ${device.tablet} {
    .post {
      width: 600px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
`
const PostsContainer = styled.div`
  overflow: auto;
  overscroll-behavior: contain;
  padding: 1rem 0.5rem;
`

export default ComicsScreen
