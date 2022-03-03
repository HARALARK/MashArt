import React from 'react';
import styled from "styled-components"
import device from "../screen_sizes/devices"
import { Input } from "../components/styled-components/Input";

const EditArtScreen = () => {

    return (
    <div>
      <Hero>
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

                    <p className="description"> Edit Description </p>
                    <Input
                                type="text"
                                placeholder="Enter text"
                                required
                    />
                    <Filters> 
                        <img className= "filter1" src="/images/logo/logo.png" alt="filter1" />
                        <img className= "filter2" src="/images/logo/logo.png" alt="filter2" />
                        <img className= "filter3" src="/images/logo/logo.png" alt="filter3" />
                        <img className= "filter4" src="/images/logo/logo.png" alt="filter4" />
                        <img className= "filter5" src="/images/logo/logo.png" alt="filter5" />
                    </Filters>

                    <Button className="leaveroom" > Leave Room </Button>
              </Form>
          </Container>
      </Hero>
    </div>
  )};

  const Hero = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
  width: 100vw;
  .design-container {
    display: none;
  }

  .heading {
    color: var(--light);
    font-size: 2rem;
    text-align: center;
  }

  .subheading{
      color: var(--light);
  }

  // TODO: add for mobile
  @media ${device.tablet} {
    height: calc(100vh - 160px);
    flex-direction: row;
    justify-content: space-between;
    padding: 0 2rem;
   
    outline: 1px dashed red;
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
  align-items: center;
  color: black;
  
  .upload {
    font-size: 1rem;
    font-weight: 600;
    margin-left: -600px;
    margin-top: 10px; 
  }
  .description {
    color: black;
    font-size: 1rem;
    font-weight: 600;
    margin-left: -600px;
    margin-top: 230px; 
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
    background-color: var(--secondary);
    padding: 10px;
    display: flex;
    border-radius: 20px;
    font-size: 30px;
    height: 70px;
    color: var(--light);
    width: 750px;

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




const Filters = styled.section`
    background-color: var(--secondary);
    padding: 10px;
    display: flex;
    margin-top: 20px;
    margin-left: -400px;
    border-radius: 20px;
    font-size: 30px;
    height: 70px;
    color: var(--light);
    width: 350px;

    .filter1{
        height: 50px;
        width: 50px;
        background-color: white;
        border-radius: 10px;
        margin-left: 0px;
    }

    .filter2{
        height: 50px;
        width: 50px;
        border-radius: 10px; 
        margin-left: 5px;
        background-color: white;

    }
    .filter3{
        height: 50px;
        width: 50px;
        border-radius: 10px;
        margin-left: 5px;
        background-color: white;
    }
    .filter4{
        height: 50px;
        width: 50px;
        border-radius: 10px;
        margin-left: 5px;
        background-color: white;
    }
    .filter5{
        height: 50px;
        width: 50px;
        border-radius: 10px;
        margin-left: 5px;
        background-color: white;
    }
`   
export default EditArtScreen;