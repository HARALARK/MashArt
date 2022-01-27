import React from 'react';
import styled from 'styled-components';
import device from "../screen_sizes/devices"

const GameInfo = () => {
  return (
  <Offside>
    <div className='container'>
      <p className='heading'> How Do Collabs Work?</p>
        <div className='text-container'>
          <div className='text-design'>
            <p className='leftH'> 1</p>
            <p className='body'> Create your own room and invite others
            or join an existing room.</p>
          </div>
        </div>

        <div className='text-container'>
          <div className='text-design'>
            <p className='leftH'> 2</p>
            <p className='body'> The host comes up with a 
            starting sentence - what to choose? Hmm.. </p>
          </div>
        </div>

        <div className='text-container'>
          <div className='text-design'>
            <p className='leftH'> 3</p>
            <p className='body'> Room members collaborate on a
            drawing based off the host's sentence! </p>
          </div>
        </div>

        
    </div>
  </Offside>
  )
};

const Offside = styled.div`
  
  .container {
    display: inline-block;
    position: relative;
    background-color: var(--primary-dark);
    padding: 1rem 1rem 1rem 1rem;
    border-radius: 5px;
    box-shadow: 20px 20px 50px  var(--primary) inset;
  }

  .text-container{
    display: inline-block;
    position: relative;
    background-color: var(--primary-dark);
    padding: 1rem 1rem 1rem 1rem;
    border-radius: 5px;
  }

  .heading {
    color: var(--light);
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
  }

  .text-design{
    color: var(--light);
    font-weight: bold;
  }

  .text-design .body {
    color: var(--light);
    font-size: 1.5rem;
  }

  .text-design .leftH{
    font-size: 2rem;
  }

  
  @media ${device.tablet} {
    height: 500px;
    width: 600px;
  }
`

export default GameInfo;
