import * as React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import BullIcon from '../assets/rising.svg';

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
    </div>
  );
};
