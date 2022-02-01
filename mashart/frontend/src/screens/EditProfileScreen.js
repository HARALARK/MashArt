import React from 'react';
import styled from "styled-components"
import device from "../screen_sizes/devices"
import { Input } from "../components/styled-components/Input";


const EditProfileScreen = () => {

  return (
  <div>
    <Hero>
        <Container>
            <Form>
                <p1 className="heading"><WatermarkImage src="/images/logo/watermark.png"alt="logo"/> Edit Profile </p1>
                <p className="subheading"> Update Username </p>
                <Input
                            type="text"
                            placeholder="New Username"
                        />  
                <p className="subheading"> Update Password</p>
                <Input
                            type="text"
                            placeholder="New Password"
                            required
                        />
                
                <p className="subheading"> Edit Bio </p>
                <Input
                            type="text"
                            placeholder="Enter text"
                            required
                        />
    
                <p className = "subheading"> Change Profile Photo</p>
                <Button>Upload Profile Photo</Button>
                <p className = "subheading"> Change Cover Photo</p>
                <Button>Upload Cover Photo</Button>
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
    flex-direction: row;
    height: calc(100vh - 80px);
    gap: 2rem;
    padding: 0 2rem;
    width: 50vw;}
   
    outline: 1px dashed red;
`

const Form = styled.form`
  background-color: var(--secondary-dark);
  padding: 1rem 2rem 1rem;
  border-radius: 5px;
  // TODO: adjust h and w for different sizes
  width: 100%;
  height: 98%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  outline: 1px dashed green;
`

const Button = styled.p`
  
  text-align: center;
  padding: 0.2rem 1rem;
  border: 3px solid var(--light);
  color: var(--light);
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 100ms ease-in-out;

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



export default EditProfileScreen;
