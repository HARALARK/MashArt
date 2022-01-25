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
                <p className="subheading"> Update your Username </p>
                <Input
                            type="text"
                            placeholder="New Username"
                        />  
                <p className="subheading"> Update your Password</p>
                <Input
                            type="text"
                            placeholder="New Password"
                            required
                        />
                
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
                <SubmitButton type = "button" value="Upload"  />
                <p className = "subheading"> Change Cover Photo</p>
                <SubmitButton type = "button" value="Upload"  />
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
  @media ${device.laptop} {
    flex-direction: row;
    height: calc(100vh - 80px);
    gap: 2rem;
    padding: 0 2rem;
   
`

const Form = styled.form`
  background-color: var(--secondary-dark);
  padding: 2rem 2rem 1rem;
  border-radius: 5px;

  // TODO: adjust h and w for different sizes
  width: 500px;
  height: 98%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

`

const SubmitButton = styled(Input)`
  background-color: var(--primary);
  color: var(--dark);
  font-weight: 600;
  margin: 0rem 0 0rem;
  font-size: 0.8rem;
  padding-bottom: 0.4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-dark);
  }
`

const Watermark = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
`
const WatermarkImage = styled.img`
  height: 37px;
  width: 37px;
  border-radius: 0px;
  padding: px;
  margin-right: 3px;
`

const WatermarkTxt = styled.p`
  letter-spacing: 3px;
  font-size: 1.3rem;
  font-weight: 500;
  color: #ffefd7;
`


export default EditProfileScreen;
