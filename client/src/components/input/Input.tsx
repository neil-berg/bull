import * as React from 'react';
import styled from 'styled-components';

import { Colors } from '../../styles';

interface Props {
  className?: string;
  stlye?: React.CSSProperties;
  'data-testid'?: string;
}

export const Input = (props: React.PropsWithChildren<Props>) => {
  return <StyledInput {...props}>{props.children}</StyledInput>;
};

const StyledInput = styled.div`
  position: relative;
  margin-right: 30px;

  > label {
    position: absolute;
    top: 0;
    left: 10px;
    transform: translateY(-50%);
    background: ${Colors.backgroundGrey};
    padding: 0 10px;
  }

  > input {
    height: 46px;
    padding: 12px 14px;
    border: 2px black solid;
    border-radius: 4px;
    background: transparent;
    min-width: 225px;
    font-size: 12px;
    transition: all 0.125s ease;

    ::placeholder {
      font-size: 14px;
      padding-left: 5px;
    }

    :focus {
      border-color: ${Colors.mintGreen};
      outline: 0;
      background-color: transparent;
    }

    :-webkit-autofill {
      -webkit-box-shadow: 0 0 0 100px ${Colors.backgroundGrey} inset;
      box-shadow: 0 0 0 100px ${Colors.backgroundGrey} inset;
    }
  }

  @media screen and (max-width: 900px) {
    margin-right: 0;
    margin-bottom: 25px;
  }
`;
