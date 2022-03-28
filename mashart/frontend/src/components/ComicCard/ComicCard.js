import React from "react"
import styled from "styled-components"

const ComicCard = ({ comic, setComic, setReaderPopUp }) => {
  const { title, description, path } = comic

  const onComicSelected = () => {
    setReaderPopUp(true)
    setComic(comic)
  }

  return (
    <Container onClick={onComicSelected}>
      <ComicCoverImage src={path[0]} />
      <ComicCover>
        <div className="space"></div>
        <Info>
          <p className="pages">Pages: {path.length}</p>
          <Title>{title}</Title>
          <Description>
            {description ? description : "No Description..."}
          </Description>
        </Info>
      </ComicCover>
    </Container>
  )
}

const Container = styled.div`
  cursor: pointer;
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
`

const ComicCoverImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 5px;
`

const ComicCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  background-image: linear-gradient(transparent, 65%, #000000bb);
  color: var(--light);
  border-radius: 5px;
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;

  .space {
    flex: 1;
  }
`
const Info = styled.div`
  display: flex;
  flex-direction: column;

  .pages {
    font-size: 0.7rem;
  }
`

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: 1px;
`

const Description = styled.p`
  font-size: 0.75rem;
  text-align: justify;
  padding-bottom: 0.5rem;
  line-height: 0.8rem;
  height: 40px;
`

export default ComicCard
