import styled from "styled-components"

export const Input = styled.input`
  padding: ${(prop) => (prop.padding ? prop.padding : "0.7rem 1rem")};
  width: ${(prop) => (prop.width ? prop.width : "")};
  border: none;
  border-radius: 5px;
<<<<<<< HEAD
  &:focus {
=======
  a &:focus {
>>>>>>> aac0dc4 (removed the font-family and font-size due to bugs in PasswordInput)
    outline: none;
  }
`

export const PasswordInput = styled(Input)`
  flex: 1;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`
