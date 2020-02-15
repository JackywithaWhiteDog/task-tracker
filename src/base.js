import firebase from 'firebase/app';
import 'firebase/analytics';

function insureFirebase() {
  if (firebase.apps.length === 0) {
    const firebaseConfig = {
      apiKey: "AIzaSyBWFPMQ9wjnMSpQ-lzAtAvKKoDqmmUkm_c",
      authDomain: "task-tracker-279c8.firebaseapp.com",
      databaseURL: "https://task-tracker-279c8.firebaseio.com",
      projectId: "task-tracker-279c8",
      storageBucket: "task-tracker-279c8.appspot.com",
      messagingSenderId: "93406496415",
      appId: "1:93406496415:web:fbb760852eea1a728bc4aa",
      measurementId: "G-4D12W0DEJC"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}

const getDatabase = () => {
  insureFirebase();
  return firebase.database();
}

export { insureFirebase, getDatabase }