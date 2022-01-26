import React from 'react';
import styled from 'styled-components';
import device from "../screen_sizes/devices"

const GameInfo = () => {
  return (
  <Offside>
    <div className='container'>
      <p> TES TEST</p>
    </div>
  </Offside>
  )
};

const Offside = styled.div`
  outline: 1px dashed blue;

  .container {
    position: relative;
  }

  @media ${device.tablet} {
    height: 500px;
    width: 400px;
  }
`

export default GameInfo;
