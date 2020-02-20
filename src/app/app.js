import React from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { NotFound } from '../notfound/notfound.js';
import { insureFirebase } from '../base.js';

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}

insureFirebase();

class Button extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.handleClick()}>{this.props.text}</button>
    )
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    const uid = firebase.auth().currentUser.uid;
    this.state = {
      activities: ['讀書', '工作', '拖延', '耍廢', '睡覺'],
      user: firebase.firestore().collection('users').doc(uid),
      currentAction: null
    }
  }

  start(activity) {
    this.state.user.set({
      time: firebase.firestore.FieldValue.serverTimestamp(),
      action: activity
    }, {merge: true}).then(() => {
      console.log(activity);
    })
  }

  componentDidMount() {
    this.state.user.onSnapshot(docSnapshot => {
      this.setState({
        currentAction: docSnapshot.data().action
      })
    })
  }

  render() {
    return (
      <main>
        <h1>home</h1>
        <h2>{this.state.currentAction}</h2>
        <section>
          {this.state.activities.map((item, i) =>
            <Button
              key={i}
              text={item}
              handleClick={() => this.start(item)}
            />
          )}
        </section>
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
          <Route
            exact
            path="/app/home"
            component={Home}
          />
          <Route
            exact
            path="/app/record"
            component={Record}
          />
          <Route
            exact
            path="/app/setting"
            component={Setting}
          />
          <Route
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