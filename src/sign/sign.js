import React from 'react';
import { Route, Link } from 'react-router-dom';
import { NotFound } from '../notfound/notfound.js';

function TextInput(props) {
  return (
    <div>
      <label>{props.label}</label><input type="text" />
    </div>
  );
}

function Form(props) {
  return (
    <form>
      {props.isSignup ? <TextInput label='暱稱：' /> : null}
      <TextInput label='信箱：' />
      <TextInput label='密碼：' />
      {props.isSignup ? <TextInput label='確認密碼：' /> : null}
      <input type='submit' value={props.isSignup ? '註冊' : '登入'} />
    </form>
  );
}

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusList: ['signup', 'signin'],
    }
  }

  render() {
    const {action} = this.props.match.params;
    const status = this.state.statusList.indexOf(action);
    return (
      status !== -1 ?
      <main>
        <Form isSignup={status === 0} />
        {
          status === 0 ?
          <Link to="/sign/signin">登入</Link>
          :
          <Link to="/sign/signup">註冊</Link>  
        }
      </main>
      :
      <Route
        component={NotFound}
        status={404}
      />
    );
  }
}

export {Sign}