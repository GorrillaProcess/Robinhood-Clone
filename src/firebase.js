import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyD46znfrIDaKFJPXbZXqThwnPikYaqvRCA",
  authDomain: "robinhood-clone-67fcb.firebaseapp.com",
  projectId: "robinhood-clone-67fcb",
  storageBucket: "robinhood-clone-67fcb.appspot.com",
  messagingSenderId: "320910678424",
  appId: "1:320910678424:web:47542363c6715e89eaf3ed",
  measurementId: "G-S90JW7B78K"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db };