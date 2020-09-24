import * as React from 'react';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';

import { addUser } from '../../redux/actions';
import { Input, TextSpan } from '../../components';
import { ErrorCode, User } from '../../types';
import { Colors } from '../../styles';

const Copy = defineMessages({
  ErrorInvalidCredetials: {
    id: 'ErrorInvalidCredentials',
    defaultMessage: 'Incorrect email or password.',
  },
  ErrorGeneric: {
    id: 'ErrorGenericSignIn',
    defaultMessage: 'Unable to process request. Try again.',
  },
  SignInFormSubmit: {
    id: 'SignInFormSubmit',
    defaultMessage: 'Sign In',
  },
});

const enum Classes {
  FormContainer = 'sign-in-form-container',
  InputContainer = 'sign-in-form-input-container',
  ErrorContainer = 'sign-in-form-error-container',
  ErrorMessage = 'sign-in-form-error-message',
}

export const enum SignInFormTestID {
  Form = 'sign-in-form',
  UserNameInput = 'sign-in-form-username-input',
  PasswordInput = 'sign-in-form-password-input',
  SubmitButton = 'sign-in-form-submit-button',
  ErrorMessage = 'sign-in-form-error-message',
}

export const SignInForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<JSX.Element | null>(
    null,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!email && !password) {
      setErrorMessage(null);
    }
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = process.env.API_URL + '/api/users/signin';
      const res = await axios.post<User>(
        url,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser({ id: res.data.id, userName: res.data.userName }));
    } catch (e) {
      const err = e as AxiosError<{ errorCode: number }>;
      err.response.data.errorCode === ErrorCode.INVALID_CREDENTIALS
        ? setErrorMessage(<FormattedMessage {...Copy.ErrorInvalidCredetials} />)
        : setErrorMessage(<FormattedMessage {...Copy.ErrorGeneric} />);
    }
  };

  const disableButton = !email || !password;

  return (
    <StyledSignInForm
      errorMessage={!!errorMessage}
      onSubmit={(e) => handleSubmit(e)}
      data-testid={SignInFormTestID.Form}
    >
      <div className={Classes.FormContainer}>
        <Input>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            placeholder='Enter email'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid={SignInFormTestID.UserNameInput}
          />
        </Input>
        <Input>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid={SignInFormTestID.PasswordInput}
          />
        </Input>
        <button
          type='submit'
          disabled={disableButton}
          style={{
            cursor: disableButton ? 'auto' : 'pointer',
          }}
          data-testid={SignInFormTestID.SubmitButton}
        >
          <FormattedMessage {...Copy.SignInFormSubmit} />
        </button>
      </div>
      <TextSpan
        className={Classes.ErrorMessage}
        data-testid={SignInFormTestID.ErrorMessage}
      >
        {errorMessage ? errorMessage : 'A'}
      </TextSpan>
    </StyledSignInForm>
  );
};

interface StyledProps {
  errorMessage: boolean;
}

const StyledSignInForm = styled.form<StyledProps>`
  .${Classes.FormContainer} {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    height: 46px;
    padding: 10px;
    background: black;
    color: ${Colors.mintGreen};
    border-color: black;
    border-radius: 4px;
  }

  .${Classes.ErrorMessage} {
    font-size: 14px;
    font-weight: bold;
    color: ${Colors.errorRed};
    margin-top: 20px;
    line-height: 16px;
    min-height: 16px;
    visibility: ${(props) => (props.errorMessage ? 'visible' : 'hidden')};
  }

  @media screen and (max-width: 900px) {
    .${Classes.FormContainer} {
      flex-direction: column;
    }

    button {
      width: 225px;
    }
  }
`;
