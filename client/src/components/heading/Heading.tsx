import * as React from 'react';
import styled from 'styled-components';

import { Colors } from '../../styles';

interface Props {
  // Size of the heading
  size: 'xl' | 'lg' | 'md' | 'sm';
  // Class name to add styles from a parent component
  className?: string;
  // Data test id attribute
  'data-testid'?: string;
  // Inline styles
  style?: React.CSSProperties;
}

/**
 * Takes in a child element, usually a React Intl text fragment,
 * and wraps an <h1> tag around it
 */
export const Heading = (props: React.PropsWithChildren<Props>) => {
  const { children, ...rest } = props;
  let fontSize = '';
  switch (props.size) {
    case 'xl':
      fontSize = '48px';
      break;
    case 'lg':
      fontSize = '36px';
      break;
    case 'md':
      fontSize = '24px';
      break;
    case 'sm':
      fontSize = '14px';
      break;
    default:
      fontSize = '36px';
  }
  return (
    <StyledHeading {...rest} fontSize={fontSize}>
      {children}
    </StyledHeading>
  );
};

interface StyledProps extends Props {
  fontSize: string;
}

const StyledHeading = styled.h1<StyledProps>`
  font-size: ${(props) => props.fontSize};
  color: ${Colors.white};
`;
