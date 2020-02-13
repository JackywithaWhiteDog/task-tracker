import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/analytics'

import { Welcome } from './welcome/welcome.js';
import { Sign } from './sign/sign.js';
import { App } from './app/app.js';
import { NotFound } from './notfound/notfound.js';

import './index.css';

class Main extends React.Component {
  render() {
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
            path="/sign/:action"
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
}

// ==========================================================

const firebaseConfig = {
  apiKey: "AIzaSyBWFPMQ9wjnMSpQ-lzAtAvKKoDqmmUkm_c",
  authDomain: "task-tracker-279c8.firebaseapp.com",
  databaseURL: "https://task-tracker-279c8.firebaseio.com",
  projectId: "task-tracker-279c8",
  storageBucket: "task-tracker-279c8.appspot.com",
  messagingSenderId: "93406496415",
  appId: "1:93406496415:web:fbb760852eea1a728bc4aa",
  measurementId: "G-4D12W0DEJC"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);