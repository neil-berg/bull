import * as React from 'react';
import styled from 'styled-components';

import { Colors } from '../../styles';

interface Props {
  // Class name to add styles from a parent component
  className?: string;
  // Data test id attribute
  'data-testid'?: string;
  // Inline styles
  style?: React.CSSProperties;
  // On click handler
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

/**
 * Takes in a child element, usually a React Intl text fragment,
 * and wraps a <span> tag around it
 */
export const TextSpan = (props: React.PropsWithChildren<Props>) => {
  const { children, ...rest } = props;
  return <StyledTextSpan {...rest}>{children}</StyledTextSpan>;
};

const StyledTextSpan = styled.span`
  font-size: 14px;
  color: ${Colors.black};
`;
