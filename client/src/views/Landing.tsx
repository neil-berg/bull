import * as React from 'react';
import axios from 'axios';
import { FormattedMessage, defineMessages } from 'react-intl';

import BullIcon from '../assets/svgs/rising.svg';

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
      const res = await axios.post(process.env.API_URL + '/api/users', {
        name: 'Neil BB'
      })
      console.log(res);
    } catch(e) {
      console.log(e)
    }
  }

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
    </div>
  );
};
