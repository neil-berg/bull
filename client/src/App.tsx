import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Landing } from './views';

export const App = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Landing />
      </Route>
      <Route path='*'>
        <Landing />
      </Route>
    </Switch>
  );
};
