import React from 'react';
import { NotFound } from '../notfound/notfound.js';

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