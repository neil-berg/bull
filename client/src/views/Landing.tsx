import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { Account } from '../features/';
import { addUser, removeUser } from '../redux/actions';
import { StoreState } from '../redux/store';
import {
  AccountFormToggle,
  Footer,
  LiveTicker,
  PlaceholderTicker,
  StaticTicker,
} from '../features';
import BullIcon from '../assets/svgs/rising.svg';
import { isTradingDate } from '../util';
import { Colors } from '../styles';
import { Heading } from '../components';
import Axios from 'axios';

const Copy = defineMessages({
  Title: {
    id: 'Title',
    defaultMessage: 'Bull',
  },
  Tagline: {
    id: 'Tagline',
    defaultMessage:
      'Real-time stocks, financial news, and personal portfolio tools',
  },
});

export const enum LandingDataTestID {
  BullIcon = 'bull-icon',
  Title = 'app-title',
  Tagline = 'app-tagline',
}

const enum Classes {
  HeadingContainer = 'heading-container',
  BullIcon = 'heading-bull-icon',
  Title = 'heading-app-title',
  Tagline = 'heading-tagline',
}

export const Landing = () => {
  const user = useSelector((state: StoreState) => state.user);

  const handleClick = async () => {
    try {
      const res = await axios.get('/api/users/test');
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCookie = async () => {
    try {
      const res = await axios.post(process.env.API_URL + '/cookie');
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StyledLanding>
      <PlaceholderTicker />
      <div className={Classes.HeadingContainer}>
        <Heading
          size='xl'
          className={Classes.Title}
          data-testid={LandingDataTestID.Title}
        >
          <FormattedMessage {...Copy.Title} />
        </Heading>
        <BullIcon
          className={Classes.BullIcon}
          data-testid={LandingDataTestID.BullIcon}
        />
        <Heading
          size='md'
          className={Classes.Tagline}
          data-testid={LandingDataTestID.Tagline}
        >
          <FormattedMessage {...Copy.Tagline} />
        </Heading>
      </div>
      <button onClick={handleClick}>GET TEST</button>
      <button onClick={handleCookie}>HANDLE COOKIE</button>
      {/* {isTradingDate() ? <LiveTicker /> : <StaticTicker />} */}
      {user.id ? <Account /> : <AccountFormToggle />}
      <Footer />
    </StyledLanding>
  );
};

const StyledLanding = styled.div`
  .${Classes.HeadingContainer} {
    background-color: ${Colors.backgroundBlack};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .${Classes.Title} {
    color: ${Colors.mintGreen};
  }

  .${Classes.BullIcon} {
    width: 100px;
    height: 100px;
    margin: 20px 0;

    > * {
      fill: ${Colors.mintGreen};
    }
  }
`;
