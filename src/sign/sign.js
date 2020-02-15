import React from 'react';
import firebase from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import 'firebase/auth'

import { insureFirebase } from '../base.js';

insureFirebase();

function Sign(props) {
  const uiConfig = {
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
  };

  return (
    <main>
      <StyledFirebaseAuth
        uiConfig = {uiConfig}
        firebaseAuth={firebase.auth()}
      />
    </main>
  );
}

export {Sign}