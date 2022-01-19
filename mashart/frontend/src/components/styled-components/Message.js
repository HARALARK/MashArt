import styled from "styled-components"

const Message = styled.p`
  background-color: ${(props) =>
    (props.variant === "success" && "#D1E7DD") ||
    (props.variant === "error" && "#F8D7DA") ||
    (props.variant === "warning" && "#FFF3CD") ||
    "#3E3E3E"};

  color: ${(props) =>
    (props.variant === "success" && "#2B674B") ||
    (props.variant === "error" && "#9C464D") ||
    (props.variant === "warning" && "#664D03") ||
    "#F0F0F0"};

  font-size: 0.8rem;

  padding: 0.5rem 1rem;
  border-radius: 5px;
  width: 100%;
`

export default Message
