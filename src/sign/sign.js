import React from 'react';
import firebase from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import 'firebase/auth'

import { insureFirebase } from '../base.js';

insureFirebase();

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uiConfig: {
        signInSuccessUrl: '/#/app/',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        tosUrl: '/',
        privacyPolicyUrl: '/',
        signInFlow: 'popup',
        callbacks: {
          'signInSuccessWithAuthResult': (authResult, redirectUrl) => {
            alert('Success');
            return true;
          },
        }
      }
    }
  }

  render() {
    return (
      <main>
        <StyledFirebaseAuth
          uiConfig = {this.state.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </main>
    );
  }
}

export {Sign}