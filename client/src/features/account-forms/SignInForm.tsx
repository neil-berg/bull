import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';

import { addUser } from '../../redux/actions';
import { AccountForm, TextSpan } from '../../components';
import { ErrorCode, User } from '../../types';

const Copy = defineMessages({
  WelcomeBack: {
    id: 'WelcomeBack',
    defaultMessage: 'Welcome back!',
  },
  ErrorInvalidCredetials: {
    id: 'ErrorInvalidCredentials',
    defaultMessage: 'Incorrect credentials.',
  },
  ErrorGeneric: {
    id: 'ErrorGenericSignIn',
    defaultMessage: 'Unable to process request. Try again.',
  },
  SignInFormSubmit: {
    id: 'SignInFormSubmit',
    defaultMessage: 'Submit',
  },
});

const enum Classes {
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
  const [processSubmit, setProcessSubmit] = React.useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessSubmit(true);

    try {
      const url = process.env.API_URL + '/api/users/signin';
      const res = await axios.post<User>(url, {
        email,
        password,
      });
      dispatch(addUser({ id: res.data.id, userName: res.data.userName }));

      setProcessSubmit(false);
    } catch (e) {
      const err = e as AxiosError<{ errorCode: number }>;
      err.response.data.errorCode === ErrorCode.INVALID_CREDENTIALS
        ? setErrorMessage(<FormattedMessage {...Copy.ErrorInvalidCredetials} />)
        : setErrorMessage(<FormattedMessage {...Copy.ErrorGeneric} />);
      setProcessSubmit(false);
    }
    setProcessSubmit(false);
  };

  return (
    <AccountForm
      onSubmit={(e) => handleSubmit(e)}
      data-testid={SignInFormTestID.Form}
    >
      <TextSpan
        style={{
          fontSize: '24px',
          textAlign: 'center',
          marginBottom: '30px',
        }}
      >
        <FormattedMessage {...Copy.WelcomeBack} />
      </TextSpan>
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
      {errorMessage ? (
        <TextSpan
          className={Classes.ErrorMessage}
          data-testid={SignInFormTestID.ErrorMessage}
        >
          {errorMessage}
        </TextSpan>
      ) : (
        <TextSpan className={Classes.ErrorMessage}>{''}</TextSpan>
      )}
      <button
        type='submit'
        disabled={processSubmit}
        style={{
          cursor: processSubmit ? 'auto' : 'pointer',
        }}
        data-testid={SignInFormTestID.SubmitButton}
      >
        <FormattedMessage {...Copy.SignInFormSubmit} />
      </button>
    </AccountForm>
  );
};
