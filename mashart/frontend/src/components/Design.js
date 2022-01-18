import React from "react"
import styled from "styled-components"
import device from "../screen_sizes/devices"

const Design = () => {
  return (
    <Right>
      <div className="container">
        <SVG src="./images/blob.svg" alt="blob" boxSize="320" />
        <SVG
          className="collab"
          src="./images/collab.svg"
          alt="collab"
          boxSize="250"
        />
        <div className="text-design">
          <p className="collaborate">Collaborate</p>
          <p className="share">Share</p>
          <p className="enjoy">Enjoy!!!</p>
        </div>
      </div>
    </Right>
  )
}

const Right = styled.div`
  .container {
    position: relative;
  }
  .collab {
    position: absolute;
    left: 0;
  }

  .text-design {
    position: absolute;
    top: 60%;
    font-weight: 900;
    font-size: 2rem;
    line-height: 65%;
    letter-spacing: -2px;
  }

  .text-design .collaborate {
    color: var(--white);
  }

  .text-design .share {
    color: var(--secondary);
  }

  .text-design .enjoy {
    color: var(--primary);
  }

  @media ${device.tablet} {
    .text-design {
      font-size: 2.35rem;
    }
  }

  @media ${device.laptop} {
    .text-design {
      font-size: 2.7rem;
    }
  }
`

const SVG = styled.img`
  height: ${(props) => props.boxSize || props.height}px;
  width: ${(props) => props.boxSize || props.width}px;
  color: ${(props) => props.color || "var(--primary)"};

  @media ${device.tablet} {
    height: ${(props) => (props.boxSize || props.height) * 1.2}px;
    width: ${(props) => (props.boxSize || props.width) * 1.2}px;
  }

  @media ${device.laptop} {
    height: ${(props) => (props.boxSize || props.height) * 1.4}px;
    width: ${(props) => (props.boxSize || props.width) * 1.4}px;
  }
`

export default Design
