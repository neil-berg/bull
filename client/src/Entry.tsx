import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { App } from './App';
import './styles/reset.css';

ReactDOM.render(
  <IntlProvider locale={navigator.language} onError={() => {}}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </IntlProvider>,
  document.getElementById('app'),
);
