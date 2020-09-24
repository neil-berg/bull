import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Heading } from '../../components';
import { removeUser } from '../../redux/actions';
import { StoreState } from '../../redux/store';
import { User } from '../../types';

const Copy = defineMessages({
  AccountGreeting: {
    id: 'Account.Greeting',
    defaultMessage: 'Welcome, {userName}!',
  },
  AccountSignOut: {
    id: 'Account.SignOut',
    defaultMessage: 'Sign Out',
  },
});

const enum Classes {
  Container = 'accout-container',
  Greeting = 'account-greetig',
}

export const enum AccountTestID {}

export const Account = () => {
  const { id, userName } = useSelector((state: StoreState) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const url = process.env.API_URL + '/api/users/signout';
      await axios.post(url, { id });
      dispatch(removeUser());
    } catch (e) {
      console.log(e);
      // const err: AxiosError<{ errorCode: number }> = e;
      // err.response.data.errorCode === ErrorCode.EMAIL_ALREADY_TAKEN
      //   ? setErrorMessage(<FormattedMessage {...Copy.ErrorEmailTaken} />)
      //   : setErrorMessage(<FormattedMessage {...Copy.ErrorCreatingUser} />);
    }
  };

  return (
    <StyledAccount>
      <div className={Classes.Container}>
        <Heading size='md' className={Classes.Greeting}>
          <FormattedMessage {...Copy.AccountGreeting} values={{ userName }} />
        </Heading>
        <button onClick={handleSignOut}>
          <FormattedMessage {...Copy.AccountSignOut} />
        </button>
      </div>
    </StyledAccount>
  );
};

const StyledAccount = styled.div`
  display: flex;
  justify-content: center;

  .${Classes.Container} {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .${Classes.Greeting} {
    color: black;
  }

  button {
    margin-top: 20px;
    color: black;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
`;
