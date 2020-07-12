import * as React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

const AllTheProviders = (props: { children: JSX.Element }) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <IntlProvider locale={navigator.language} onError={() => {}}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </IntlProvider>
  );
};

export function renderWithProviders(component: JSX.Element) {
  return render(component, { wrapper: AllTheProviders });
}
