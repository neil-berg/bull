import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import {Routes} from './routes'
import { Landing, SecondPage } from './views';

export const App = () => {
  return (
    <Switch>
      <Route exact path={Routes.Landing}>
        <Landing />
      </Route>
      <Route exact path={Routes.SecondPage}>
        <SecondPage />
      </Route>
      <Route path='*'>
        <Landing />
      </Route>
    </Switch>
  );
};
