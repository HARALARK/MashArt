import React from "react"
import styled from "styled-components"

const PostsTab = () => {
  return (
    <div className="PostsTab">
      <PlaceHolder> Placeholder text</PlaceHolder>
      {/* Display previous posts */}
    </div>
  )
}

const PlaceHolder = styled.p`
  font-size: 2rem;
  text-align: center;
`

export default PostsTab
