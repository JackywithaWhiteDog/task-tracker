import React from 'react';
import { HashRouter, Switch, Link } from 'react-router-dom';
import firebase from 'firebase/app'
import 'firebase/auth'

import { PublicRoute, PrivateRoute } from '../route.js';

import { NotFound } from '../notfound/notfound.js';

class Home extends React.Component {
  render() {
    return (
      <main>
        <h1>home</h1>
      </main>
    )
  }
}

class Record extends React.Component {
  render() {
    return (
      <main>
        <h1>record</h1>
      </main>
    )
  }
}

class Setting extends React.Component {
  signout() {
    firebase.auth().signOut().then(() => {
      window.location = '../../'
    });
  }

  render() {
    return (
      <main>
        <h1>setting</h1>
        <button onClick={() => this.signout()}>登出</button>
      </main>
    )
  }
}

const App = () => {
  return (
    <main>
      <HashRouter>
        <Switch>
          <PrivateRoute
            exact
            path="/app/home"
            component={Home}
          />
          <PrivateRoute
            exact
            path="/app/record"
            component={Record}
          />
          <PrivateRoute
            exact
            path="/app/setting"
            component={Setting}
          />
          <PublicRoute
            restricted={false}
            exact
            component={NotFound}
            status={404}
          />
        </Switch>
      </HashRouter>
      <nav>
        <Link to="/app/home">首頁</Link>
        <Link to="/app/record">紀錄</Link>
        <Link to="/app/setting">設定</Link>
      </nav>
    </main>
  );
}

export {App}