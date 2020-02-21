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
    this.state = {
      activities: ['讀書', '工作', '拖延', '耍廢', '睡覺'],
    }
  }

  render() {
    return (
      <main>
        <h1>home</h1>
        <section>
          {this.state.activities.map((item, i) =>
            <Button
              key={i}
              text={item}
              handleClick={() => this.props.changeAction(item)}
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

class App extends React.Component {
  constructor(props) {
    super(props);
    const uid = firebase.auth().currentUser.uid;
    this.state = {
      user: firebase.firestore().collection('users').doc(uid),
      currentAction: null
    }
  }

  changeAction(newAction) {
    const now = Date.now();
    const user = this.state.user;
    const records = user.collection('records');
    let action = null;

    // record duration of previous action
    user.get().then(doc => {
      if (doc.exists && doc.data().action != null && doc.data().action !== newAction) {
        let d = new Date();
        d.setHours(0); d.setMinutes(0); d.setSeconds(0); d.setMilliseconds(0);
        const today = d.getTime();
        d.setHours(-24);
        const yesterday = d.getTime();
        let start = doc.data().start;

        action = doc.data().action;
        if (start < today) {
          records.add({
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            date: yesterday,
            start: start,
            end: today,
            duration: today-start,
            action: action
          })
          start = today;
        }
        records.add({
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          date: today,
          start: start,
          end: now,
          duration: now-start,
          action: action
        })
      }
    });

    if (action !== newAction) {
      user.set({
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        start: now,
        action: newAction
      },{merge: true}) 
    }
  }

  componentDidMount() {
    this.state.user.onSnapshot(docSnapshot => {
      if (docSnapshot.data() !== undefined) {
        this.setState({
          currentAction: docSnapshot.data().action
        })
      }
    })
  }

  render() {
    return (
      <main>
        <div>
          <h2>{this.state.currentAction}</h2>
          <Button
            text='結束'
            handleClick={() => this.changeAction(null)}
          />
        </div>
        <HashRouter>
          <Switch>
            <Route
              exact
              path="/app/home"
              render={props =>
              <Home
                {...props}
                changeAction={a => this.changeAction(a)}
              />}
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
}

export {App}