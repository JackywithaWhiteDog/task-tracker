import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import firebase from 'firebase/app'

import { PublicRoute, PrivateRoute } from './route.js';

import { Welcome } from './welcome/welcome.js';
import { Sign } from './sign/sign.js';
import { App } from './app/app.js';
import { NotFound } from './notfound/notfound.js';

import './index.css';
import { insureFirebase } from './base.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignin: false
    }
    insureFirebase();
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isSignin: user != null
      })
    });
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <PublicRoute
            restricted={false}
            signin={this.state.isSignin}
            exact
            path="/"
            component={Welcome}
          />
          <PublicRoute
            restricted={true}
            signin={this.state.isSignin}
            exact
            path="/sign"
            component={Sign}
          />
          <PrivateRoute
            signin={this.state.isSignin}
            exact
            path="/app/:page"
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

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);