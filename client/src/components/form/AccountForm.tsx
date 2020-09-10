import * as React from 'react';
import styled from 'styled-components';

import { Colors } from '../../styles';

const enum Classes {
  ErrorMessage = 'sign-in-form-error-message',
}

interface Props {
  children: JSX.Element[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  'data-itestid'?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Form container for RegisterForm and SignInForm
 */
export const AccountForm = (props: Props) => {
  return (
    <StyledAccountForm onSubmit={props.onSubmit}>
      {props.children}
    </StyledAccountForm>
  );
};
AccountForm.displayName = 'Account Form';

const StyledAccountForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
  height: 325px;
  border: 2px grey solid;
  border-radius: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  padding: 20px;

  input {
    margin: 10px 0;
    outline: 0;
    border: 0;
    border-bottom: 2px black solid;
    padding-bottom: 5px;

    &:focus {
      border-bottom: 2px green solid;
    }
  }

  input:first-of-type {
    margin-bottom: 20px;
  }

  .${Classes.ErrorMessage} {
    color: ${Colors.errorRed};
    height: 16px;
    font-weight: bold;
  }

  button {
    margin: 10px 0;
    padding: 10px 20px;
    border-radius: 20px;
    outline: 0;
  }
`;
