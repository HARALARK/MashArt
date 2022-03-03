import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import device from "../screen_sizes/devices"
import { DescInput } from "../components/styled-components/Input";

const EditArtScreen = () => {
  const [image, setImage] = useState(null)

    return (
    <div>
          <Container>
              <Form>
                    <Header> 
                        <img className= "profilePicture" src="/images/logo/logo.png" alt="profilepic" /> 
                        <p1 className = "username">  Sarah's Room </p1>
                        <p1 className = "roomno"> - 2nsX3 </p1>
                        <img className= "c1" src="/images/logo/logo.png" alt="collaborator1" />
                        <img className= "c2" src="/images/logo/logo.png" alt="collaborator2" />
                        <img className= "c3" src="/images/logo/logo.png" alt="collaborator3" />
                    </Header>

                    <p className = "upload"> Upload Artwork </p>
                    <Button className="uploadart"> Upload </Button>
                    <Container2>
                      <ImageContainer>
                        {image ? (
                          <img className="post" src={image} alt="post" />
                        ) : (
                          <ImagePlaceHolder>
                            <p className="no-post">No Image</p>
                          </ImagePlaceHolder>
                        )}
                      </ImageContainer>

                      <DescContainer>
                        {/* Was thinking about putting this as a textarea for multi-line input
                        but I think its just a placeholder for now? */}
                        <DescInput
                                    type="text"
                                    placeholder="Enter text"
                                    required
                        />
                      </DescContainer>

                    </Container2>
                    
                    
                    <Filters> 
                        <img className= "filter" src="/images/logo/logo.png" alt="filter1" />
                        <img className= "filter" src="/images/logo/logo.png" alt="filter2" />
                        <img className= "filter" src="/images/logo/logo.png" alt="filter3" />
                        <img className= "filter" src="/images/logo/logo.png" alt="filter4" />
                        <img className= "filter" src="/images/logo/logo.png" alt="filter5" />
                    </Filters>

                    <Button className="leaveroom" > Leave Room </Button>
              </Form>
          </Container>
      
    </div>
  )};




const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
  width: 100%;
  

  .heading {
    color: var(--light);
    font-size: 2rem;
    text-align: center;
  }

  .subheading{
      color: var(--light);
  }

  
  @media ${device.tablet} {
    height: calc(100vh - 160px);
    flex-direction: row;
    justify-content: space-between;
    padding: 0 2rem;
   
`

const Container2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  

  @media ${device.tablet} {
    height: calc(100vh - 160px);
    flex-direction: row;
    justify-content: space-between;
    
   
`


const Form = styled.form`
  background-color: #0077b6;
  padding: 1rem 2rem 1rem;
  border-radius: 5px;
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  gap: 2 rem;
  color: black;
  
  .upload {
    font-size: 1rem;
    font-weight: 600;
     
  }
  .description {
    color: black;
    font-size: 1rem;
    font-weight: 600;
    
  }

`

const Button = styled.p`
  
  text-align: center;
  padding: 0.4rem 1rem;
  color: var(--light);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: 100ms ease-in-out;
 
  &.leaveroom {
    margin-left: 620px;
    background-color: #8b0000;
   }

   &.uploadart {
    background-color: #023e8a;
}

  &:hover {
    background-color: var(--secondary);
    color: var(--light);
  }

  @media ${device.tablet} {
    margin: 0;
    width: 150px;
  }
`


const WatermarkImage = styled.img`
  height: 37px;
  width: 37px;
  border-radius: 0px;
  padding: px;
  margin-right: 3px;
`

const Header = styled.section`
    outline: 1px dashed red;
    background-color: var(--secondary);
    display: flex;
    padding: 10px;
    
    border-radius: 20px;
    font-size: 30px;
    height: 10%;
    width: 100%;
    color: var(--light);
    

    .profilePicture {
        height: 50px;
        width: 50px;
        background-color: #ffe6aa;
        border-radius: 10px;
        margin-right: 10px;
    }
    .username {
        font-size: 30px;
        margin-left: 5px;
      }
    .roomno {
        font-size: 20px;
        margin-top: 11px;
        margin-left: 10px;
      }

    .PostTime{
        margin-left: 530px;
    }

    .c1{
        height: 50px;
        width: 50px;
        background-color: white;
        border-radius: 10px;
        margin-left: 210px;
    }

    .c2{
        height: 50px;
        width: 50px;
        border-radius: 10px; 
        margin-left: 5px;
        background-color: white;

    }
    .c3{
        height: 50px;
        width: 50px;
        border-radius: 10px;
        margin-left: 5px;
        background-color: white;
    }
`   

const DescContainer = styled.section`
    height: 80%;
    width: 50%;
    padding: 0rem 1rem 0rem 1rem;
`

const Filters = styled.section`
    display: flex;
    background-color: var(--secondary);
    
    align-items: center;
    padding: 1rem 1rem 1rem 2rem;

    width: 50%;
    border-radius: 20px;
    font-size: 30px;
    gap: 1rem;

    .filter{
        height: 50px;
        width: 50px;
        background-color: white;
        border-radius: 10px;
    }
    
`   

const ImageContainer = styled.div`
  height: 80%;
  width: 50%;
  display: flex;
  
  outline: 1px dashed green;
  .post {
    height: 300px;
    width: 300px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`

const ImagePlaceHolder = styled.div`
  background-color: var(--grey-light);
  opacity: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;

  .no-post {
    color: var(--dark);
    font-size: 1.5rem;
  }
`
export default EditArtScreen;