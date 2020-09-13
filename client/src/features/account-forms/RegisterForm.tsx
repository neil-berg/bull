import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';

import { AccountForm, TextSpan } from '../../components';
import { addUser } from '../../redux/actions';
import { ErrorCode, User } from '../../types';

const Copy = defineMessages({
  ErrorInvalidUserName: {
    id: 'ErrorInvalidUserName',
    defaultMessage: 'Please enter a user name',
  },
  ErrorInvalidPassword: {
    id: 'ErrorInvalidPassword',
    defaultMessage: 'Password must be more than 8 characters',
  },
  ErrorCreatingUser: {
    id: 'ErrorCreatingUser',
    defaultMessage: 'Unable to create account. Try again.',
  },
  ErrorEmailTaken: {
    id: 'ErrorEmailTaken',
    defaultMessage: 'Email already taken.',
  },
  RegisterFormSubmit: {
    id: 'Submit',
    defaultMessage: 'Submit',
  },
});

const enum Classes {
  ErrorMessage = 'create-account-form-error-message',
}

export const enum RegisterFormTestID {
  Form = 'create-account-form',
  EmailInput = 'create-account-form-email-input',
  UserNameInput = 'create-account-form-username-input',
  PasswordInput = 'create-account-form-password-input',
  SubmitButton = 'create-account-form-submit-button',
}

export const RegisterForm = () => {
  const [email, setEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<
    JSX.Element | string | null
  >(null);
  const [processSubmit, setProcessSubmit] = React.useState(false);
  const dispatch = useDispatch();

  const clearFields = () => {
    setEmail('');
    setUserName('');
    setPassword('');
    setErrorMessage(null);
  };

  const MIN_PASSWORD_LENGTH = 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessSubmit(true);

    if (userName.length === 0) {
      setErrorMessage(<FormattedMessage {...Copy.ErrorInvalidUserName} />);
      setProcessSubmit(false);
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrorMessage(<FormattedMessage {...Copy.ErrorInvalidPassword} />);
      setProcessSubmit(false);
      return;
    }

    try {
      const url = process.env.API_URL + '/api/users/create';
      const res = await axios.post<User>(url, {
        email,
        userName,
        password,
      });
      dispatch(addUser({ id: res.data.id, userName }));
      clearFields();
      setProcessSubmit(false);
    } catch (e) {
      const err: AxiosError<{ errorCode: number }> = e;
      err.response.data.errorCode === ErrorCode.EMAIL_ALREADY_TAKEN
        ? setErrorMessage(<FormattedMessage {...Copy.ErrorEmailTaken} />)
        : setErrorMessage(<FormattedMessage {...Copy.ErrorCreatingUser} />);
      setProcessSubmit(false);
    }
  };

  return (
    <AccountForm
      onSubmit={(e) => handleSubmit(e)}
      data-testid={RegisterFormTestID.Form}
    >
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        placeholder='Enter email'
        autoComplete='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        data-testid={RegisterFormTestID.EmailInput}
      />
      <label htmlFor='username'>User Name</label>
      <input
        type='text'
        id='username'
        placeholder='Enter user name'
        autoComplete='username'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
        data-testid={RegisterFormTestID.UserNameInput}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        placeholder='Enter password'
        autoComplete='current-password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        data-testid={RegisterFormTestID.PasswordInput}
      />
      {errorMessage ? (
        <TextSpan className={Classes.ErrorMessage}>{errorMessage}</TextSpan>
      ) : (
        <TextSpan className={Classes.ErrorMessage}>{''}</TextSpan>
      )}
      <button
        type='submit'
        disabled={processSubmit}
        style={{
          cursor: processSubmit ? 'auto' : 'pointer',
        }}
        data-testid={RegisterFormTestID.SubmitButton}
      >
        <TextSpan>
          <FormattedMessage {...Copy.RegisterFormSubmit} />
        </TextSpan>
      </button>
    </AccountForm>
  );
};
