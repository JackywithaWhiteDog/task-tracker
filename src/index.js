import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom'

import { Welcome } from './welcome/welcome.js';
import { Sign } from './sign/sign.js';
import { App } from './app/app.js';
import { NotFound } from './notfound/notfound.js';

import './index.css';

const Main = () => {
  return (
    <HashRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={Welcome}
        />
        <Route
          exact
          path="/sign"
          component={Sign}
        />
        <Route
          exact
          path="/app"
          component={App}
        />
        <Route
          exact
          component={NotFound}
          status={404}
        />
      </Switch>
    </HashRouter>
  );
}

// ==========================================================

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);