// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB21cBcrJm4mtzS-G6ZzADltczMW-_yurw",
    authDomain: "key-chat-f9af0.firebaseapp.com",
    projectId: "key-chat-f9af0",
    storageBucket: "key-chat-f9af0.appspot.com",
    messagingSenderId: "14773007160",
    appId: "1:14773007160:web:c34a09da697501654047cd"
  };

  let app; 

  if(firebase.apps.length===0){
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db, auth};