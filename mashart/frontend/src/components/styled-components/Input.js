import styled from "styled-components"

export const Input = styled.input`
  padding: ${(prop) => (prop.padding ? prop.padding : "0.7rem 1rem")};
  width: ${(prop) => (prop.width ? prop.width : "")};
  flex: ${(prop) => (prop.flex ? prop.flex : "")};
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

export const DescInput = styled.input.attrs({
  placeholder: "Description...",
})`
  border: none;

  padding: ${(prop) => (prop.padding ? prop.padding : "0.7rem 1rem")};

  border: none;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  align-items: flex-start;
  &:focus {
    outline: none;
  }
`
