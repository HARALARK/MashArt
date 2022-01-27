import React from "react"
import styled from "styled-components"

const GameInfo = () => {
  return (
    <Offside>
      <Heading> How Do Collabs Work?</Heading>
      <Container>
        <RuleContainer>
          <Number lighter>1</Number>
          <Rule lighter>
            Create your own room and invite others or join an existing room.
          </Rule>
        </RuleContainer>
        <RuleContainer>
          <Number light>2</Number>
          <Rule light>
            The host comes up with a starting sentence - what to choose? Hmm..
          </Rule>
        </RuleContainer>
        <RuleContainer>
          <Number dark>3</Number>
          <Rule dark>
            Room members collaborate on a drawing based off the host's sentence!
          </Rule>
        </RuleContainer>
      </Container>
    </Offside>
  )
}

const Offside = styled.div``

const Heading = styled.p`
  color: var(--secondary);
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  list-style: none;
`

const RuleContainer = styled.div`
  display: flex;
  align-items: center;
`

const Number = styled.h1`
  font-size: 2rem;
  color: ${(props) =>
    (props.lighter && "var(--secondary-light)") ||
    (props.light && "var(--secondary)") ||
    (props.dark && "var(--secondary-dark)")};
  width: 50px;
  text-align: center;
`

const Rule = styled.li`
  flex: 1;
  color: var(--light);
  background: ${(props) =>
    (props.lighter && "var(--secondary-light)") ||
    (props.light && "var(--secondary)") ||
    (props.dark && "var(--secondary-dark)")};
  padding: 1rem;
  border-radius: 5px;
`

export default GameInfo
