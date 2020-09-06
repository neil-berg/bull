import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FormattedMessage, defineMessages } from 'react-intl';

import { TextSpan } from '../../components';
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
});

const enum Classes {
  ErrorMessage = 'create-account-form-error-message',
}

export const CreateAccountForm = () => {
  const [email, setEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<JSX.Element | null>(
    null,
  );
  const [processSubmit, setProcessSubmit] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessSubmit(true);
    if (userName.length === 0) {
      setErrorMessage(<FormattedMessage {...Copy.ErrorInvalidUserName} />);
    } else if (password.length < 8) {
      setErrorMessage(<FormattedMessage {...Copy.ErrorInvalidPassword} />);
    } else {
      try {
        const url = process.env.API_URL + '/api/users/create';
        const res = await axios.post(url, {
          email,
          userName,
          password,
        });
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
    setProcessSubmit(false);
  };

  return (
    <StyledCreateAccountForm onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        placeholder='Enter email'
        autoComplete='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
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
      >
        Submit
      </button>
    </StyledCreateAccountForm>
  );
};

const StyledCreateAccountForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 335px;
  margin: 0 auto;
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
