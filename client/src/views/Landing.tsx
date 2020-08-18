import * as React from 'react';
import axios from 'axios';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';

import { addUser, removeUser } from '../redux/actions';
import { LiveTicker, StaticTicker } from '../features/ticker';
import BullIcon from '../assets/svgs/rising.svg';
import { isTradingDate } from '../util';

const Copy = defineMessages({
  Title: {
    id: 'Title',
    defaultMessage: 'This is the Bull App',
  },
});

export const enum LandingDataTestID {
  BullIcon = 'bull-icon',
  Title = 'title',
}

export const Landing = () => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const url = process.env.API_URL + '/api/users';
      const res = await axios.post(url, {
        name: 'testing A3',
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUserClick = () => {
    dispatch(
      addUser({
        _id: 14,
        name: 'Neil',
        username: 'neillll',
        email: 'neil@example.com',
        created: new Date(),
        updated: new Date(),
      }),
    );
  };

  return (
    <div>
      <h1 data-testid={LandingDataTestID.Title}>
        <FormattedMessage {...Copy.Title} />
      </h1>
      <BullIcon
        width='50'
        height='50'
        data-testid={LandingDataTestID.BullIcon}
      />
      <button onClick={handleClick}>Add User</button>
      <button onClick={handleUserClick}>ADD USER</button>
      <button onClick={() => dispatch(removeUser())}>Remove USER</button>
      {isTradingDate() ? <LiveTicker /> : <StaticTicker />}
    </div>
  );
};
