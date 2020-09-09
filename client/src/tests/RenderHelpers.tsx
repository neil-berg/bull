import * as React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Dispatch, createStore } from 'redux';

import { StoreState } from '../redux/store';
import { rootReducer } from '../redux/reducers';

export function renderWithProviders(
  component: JSX.Element,
  state?: StoreState,
  dispatch?: Dispatch,
) {
  const store = createStore(rootReducer, state);
  if (dispatch !== undefined) {
    store.dispatch = dispatch;
  }
  return {
    ...render(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <IntlProvider locale={navigator.language} onError={() => {}}>
        <BrowserRouter>
          <Provider store={store}>{component}</Provider>
        </BrowserRouter>
      </IntlProvider>,
    ),
  };
}
