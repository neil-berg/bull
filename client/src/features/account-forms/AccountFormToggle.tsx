import * as React from 'react';
import styled from 'styled-components';
import { FormattedMessage, defineMessages } from 'react-intl';

import { TextSpan } from '../../components';
import { RegisterForm, SignInForm } from './';
import { Colors } from '../../styles';

const Copy = defineMessages({
  RegisterPrompt: {
    id: 'RegisterPrompt',
    defaultMessage: 'Need an account? Register here.',
  },
  SignInPrompt: {
    id: 'SignInPrompt',
    defaultMessage: 'Have an account? Sign in here.',
  },
});

const enum Classes {
  Prompt = 'account-form-toggle-prompt',
}

export const AccountFormToggle = () => {
  const [showSignInForm, setShowSignInForm] = React.useState(false);

  return (
    <StyledAccountFormToggle showSignInForm={showSignInForm}>
      <TextSpan
        className={Classes.Prompt}
        onClick={() => setShowSignInForm(!showSignInForm)}
      >
        {showSignInForm ? (
          <FormattedMessage {...Copy.RegisterPrompt} />
        ) : (
          <FormattedMessage {...Copy.SignInPrompt} />
        )}
      </TextSpan>
      {showSignInForm ? <SignInForm /> : <RegisterForm />}
    </StyledAccountFormToggle>
  );
};

interface StyledProps {
  showSignInForm: boolean;
}

const StyledAccountFormToggle = styled.div<StyledProps>`
  max-width: 100vw;
  min-height: 200px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${Colors.backgroundGrey};

  .${Classes.Prompt} {
    padding: 30px 0;
    cursor: pointer;
    color: blue;
    font-weight: bold;
    letter-spacing: 0.02em;
  }
`;
