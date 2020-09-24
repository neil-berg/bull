import * as React from 'react';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';

import { Input, TextSpan } from '../../components';
import { addUser } from '../../redux/actions';
import { ErrorCode, User } from '../../types';
import { Colors } from '../../styles';

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
    defaultMessage: 'Sign Up',
  },
});

const enum Classes {
  FormContainer = 'create-account-form-container',
  InputContainer = 'create-account-form-input-container',
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
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!email && !userName && !password) {
      setErrorMessage(null);
    }
  }, [email, userName, password]);

  const clearFields = () => {
    setEmail('');
    setUserName('');
    setPassword('');
    setErrorMessage(null);
  };

  const MIN_PASSWORD_LENGTH = 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userName.length === 0) {
      setErrorMessage(<FormattedMessage {...Copy.ErrorInvalidUserName} />);
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrorMessage(<FormattedMessage {...Copy.ErrorInvalidPassword} />);
      return;
    }

    try {
      const url = '/api/users/create';
      const res = await axios.post<User>(
        url,
        {
          email,
          userName,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser({ id: res.data.id, userName }));
      clearFields();
    } catch (e) {
      const err: AxiosError<{ errorCode: number }> = e;
      err.response.data.errorCode === ErrorCode.EMAIL_ALREADY_TAKEN
        ? setErrorMessage(<FormattedMessage {...Copy.ErrorEmailTaken} />)
        : setErrorMessage(<FormattedMessage {...Copy.ErrorCreatingUser} />);
    }
  };

  const disableButton = !email || !userName || !password;

  return (
    <StyledRegisterForm
      errorMessage={!!errorMessage}
      onSubmit={(e) => handleSubmit(e)}
      data-testid={RegisterFormTestID.Form}
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
            required
            data-testid={RegisterFormTestID.EmailInput}
          />
        </Input>
        <Input>
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
            required
            data-testid={RegisterFormTestID.PasswordInput}
          />
        </Input>
        <button
          type='submit'
          disabled={disableButton}
          style={{
            cursor: disableButton ? 'auto' : 'pointer',
          }}
          data-testid={RegisterFormTestID.SubmitButton}
        >
          <FormattedMessage {...Copy.RegisterFormSubmit} />
        </button>
      </div>
      <TextSpan className={Classes.ErrorMessage}>
        {errorMessage ? errorMessage : 'A'}
      </TextSpan>
    </StyledRegisterForm>
  );
};

interface StyledProps {
  errorMessage: boolean;
}

const StyledRegisterForm = styled.form<StyledProps>`
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
