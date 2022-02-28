import styled from "styled-components"

export const Input = styled.input`
  padding: ${(prop) => (prop.padding ? prop.padding : "0.7rem 1rem")};
  width: ${(prop) => (prop.width ? prop.width : "")};
  border: none;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`

export const PasswordInput = styled(Input)`
  flex: 1;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`
