import * as React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Heading } from '../../components';
import { StoreState } from '../../redux/store';

const Copy = defineMessages({
  AccountGreeting: {
    id: 'Account.Greeting',
    defaultMessage: 'Welcome, {userName}!',
  },
});

const enum Classes {
  Greeting = 'account-greetig',
}

export const enum AccountTestID {}

export const Account = () => {
  const { userName } = useSelector((state: StoreState) => state.user);
  return (
    <StyledAccount>
      <Heading size='md' className={Classes.Greeting}>
        <FormattedMessage {...Copy.AccountGreeting} values={{ userName }} />
      </Heading>
    </StyledAccount>
  );
};

const StyledAccount = styled.div`
  .${Classes.Greeting} {
    color: black;
  }
`;
