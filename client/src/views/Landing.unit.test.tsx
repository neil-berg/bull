import * as React from 'react';
// import { fireEvent, render, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../tests';
import '@testing-library/jest-dom';

import { Landing, LandingDataTestID } from './Landing';

describe('<Landing />', () => {
  test('test', () => {
    const component = renderWithProviders(<Landing />);
    const title = component.getByTestId(LandingDataTestID.Title);
    const icon = component.getByTestId(LandingDataTestID.BullIcon);
    component.debug();
    expect(title).toBeVisible();
    expect(icon).toBeVisible();
  });
});
