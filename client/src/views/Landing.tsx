import * as React from 'react';
import axios from 'axios';
import { FormattedMessage, defineMessages } from 'react-intl';

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
      {isTradingDate() ? <LiveTicker /> : <StaticTicker />}
    </div>
  );
};
