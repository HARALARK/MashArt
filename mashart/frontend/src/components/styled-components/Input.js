import styled from "styled-components"

export const Input = styled.input`
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 5px;
  font-family: "Poppins";
  font-size: 0.8rem;
  &:focus {
    outline: none;
  }
`

export const PasswordInput = styled(Input)`
  flex: 1;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`
