import * as React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  'data-testid'?: string;
  style?: React.CSSProperties;
}

export const TextSpan = (props: React.PropsWithChildren<Props>) => {
  const { children, ...rest } = props;
  return <StyledTextSpan {...rest}>{children}</StyledTextSpan>;
};

const StyledTextSpan = styled.span`
  font-size: 14px;
  color: black;
`;
