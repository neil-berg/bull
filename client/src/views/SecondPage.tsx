import * as React from 'react';
import styled from 'styled-components';

export const SecondPage = () => {
  return (
    <StyledSecondPage>
      <h2>Some second page baby!</h2>
    </StyledSecondPage>
  )
}

const StyledSecondPage = styled.div`
  background: pink;
  height: 100vh;
  width: 100vw;
`
