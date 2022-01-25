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
                <p1 className="heading">Edit Profile</p1>
                
                <p className="subheading"> Update your Username </p>
                <Input
                            type="text"
                            placeholder="Old Username"
                            required
                        />

                <Input
                            type="text"
                            placeholder="New Username"
                        />  

                <p className="subheading"> Update your Password</p>
                
                <Input
                            type="text"
                            placeholder="Old Password"
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
  @media ${device.laptop} {
    flex-direction: row;
    height: calc(100vh - 80px);
    justify-content: space-between;
    gap: 2rem;
    padding: 0 2rem;
`

const Form = styled.form`
  background-color: var(--secondary-dark);
  padding: 2rem 2rem 1rem;
  border-radius: 5px;

  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

`

export default EditProfileScreen;
