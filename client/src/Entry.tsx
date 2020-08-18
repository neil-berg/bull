import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { App } from './App';
import './styles/reset.css';

ReactDOM.render(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  <IntlProvider locale={navigator.language} onError={() => {}}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById('app'),
);
