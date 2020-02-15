import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch } from 'react-router-dom';

import { PublicRoute, PrivateRoute } from './route.js';

import { Welcome } from './welcome/welcome.js';
import { Sign } from './sign/sign.js';
import { App } from './app/app.js';
import { NotFound } from './notfound/notfound.js';

import './index.css';

const Main = () => {
  return (
    <HashRouter>
      <Switch>
        <PublicRoute
          restricted={false}
          exact
          path="/"
          component={Welcome}
        />
        <PublicRoute
          restricted={true}
          exact
          path="/sign"
          component={Sign}
        />
        <PrivateRoute
          exact
          path="/app"
          component={App}
        />
        <PublicRoute
          restricted={false}
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