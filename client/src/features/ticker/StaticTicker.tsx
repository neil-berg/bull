import * as React from 'react';
import styled from 'styled-components';

export const StaticTicker = () => {
  return <StyledStaticTicker>Static ticker</StyledStaticTicker>;
};

const StyledStaticTicker = styled.h2`
  color: red;
`;
