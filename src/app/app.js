import React from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { NotFound } from '../notfound/notfound.js';
import { insureFirebase } from '../base.js';
import { getDay } from '../functions.js';

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

  render() {
    return (
      <main>
        <h1>home</h1>
        <section>
          {this.props.actions.map((item, i) =>
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
      currentAction: null,
      actions: ['讀書', '工作', '拖延', '耍廢', '睡覺']
    }
  }

  record(records, date, duration, action) {
    const target = records.doc(String(date));
    target.get().then(doc => {
      let total = [null, ...this.state.actions].reduce((obj, item) => {obj[item]=0; return obj}, {});
      let times = Object.assign({}, total);
      if (doc.exists) {
        let durations = doc.data().durations || [];
        let actions = doc.data().actions || [];
        total = doc.data().total || total;
        times = doc.data().times || times;
        durations.push(duration);
        actions.push(action);
        total[action] += duration;
        ++times[action];
        target.update({
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          durations: durations,
          actions: actions,
          total: total,
          times: times
        });
      }
      else {
        total[action] = duration;
        times[action] = 1;
        target.set({
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          date: date,
          durations: [duration],
          actions: [action],
          total: total,
          times: times
        });
      }
    })
  }

  changeAction(newAction) {
    const now = Date.now();
    const user = this.state.user;
    const records = user.collection('records');
    let action = null;

    // record duration of previous action
    user.get().then(doc => {
      if (doc.exists && doc.data().action !== newAction) {
        action = doc.data().action;
        let start = doc.data().start;

        let d = getDay(new Date());
        const today = d.getTime();
        d.setTime(start);
        d = getDay(d);
        let day = d.getTime();
        
        while (day < today) {
          d.setHours(d.getHours()+24);
          const next = d.getTime();
          this.record(records, day, next-start, action);
          start = day = next;
        }
        this.record(records, today, now-start, action);
      }
    });

    if (action == null || action !== newAction) {
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
                actions={this.state.actions}
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