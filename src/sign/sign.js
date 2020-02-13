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
        <h1>sign</h1>
        :
        <Route
          component={NotFound}
          status={404}
        />
    );
  }
}

export {Sign}