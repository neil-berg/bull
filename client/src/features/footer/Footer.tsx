import * as React from 'react';
import styled from 'styled-components';

import { TextSpan } from '../../components';

export const Footer = () => {
  return (
    <StyledFooter>
      <TextSpan>Made with love by Neil Berg</TextSpan>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  min-height: 200px;
  background: pink;
  display: flex;
  align-items: center;
  justify-content: center;
`;
