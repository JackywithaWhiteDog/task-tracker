import React from 'react';
import firebase from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import 'firebase/auth'
import 'firebase/firestore'

import { insureFirebase } from '../base.js';

insureFirebase();

const Sign = () => {
  const uiConfig = {
    signInSuccessUrl: '/#/app/home',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: '/',
    privacyPolicyUrl: '/',
    signInFlow: 'popup',
    callbacks: {
      'signInSuccessWithAuthResult': (authResult, redirectUrl) => {
        console.log('signin');
        const uid = authResult.user.uid;
        const ref = firebase.firestore().collection('users').doc(uid);
        ref.get().then(docSnapshot => {
          if (!docSnapshot.exists) {
            let d = new Date();
            d.setHours(0); d.setMinutes(0); d.setSeconds(0); d.setMilliseconds(0);
            ref.set({
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
              start: d.getTime(),
              action: null,
            },{merge: true});
          }
        });
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