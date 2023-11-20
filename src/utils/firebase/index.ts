import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase } from 'firebase/database';
import { Auth, getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBRrrmXwyJMeuGUjKK-0ojmN12tmPC1CK8',
  authDomain: 'react-lowcode-editor.firebaseapp.com',
  databaseURL: 'https://react-lowcode-editor-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'react-lowcode-editor',
  storageBucket: 'react-lowcode-editor.appspot.com',
  messagingSenderId: '562167225248',
  appId: '1:562167225248:web:89874a066c7ea706a8a2c5',
};

export let firebaseApp: FirebaseApp;
export let firebaseRtdb: Database;
export let firebaseAuth: Auth;

export async function initFirebase() {
  // Initialize Firebase
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
  }

  // Initialize Realtime Database and get a reference to the service
  if (!firebaseRtdb) {
    firebaseRtdb = getDatabase(firebaseApp);
  }

  // Initialize Firebase Authentication and get a reference to the service
  if (!firebaseAuth) {
    firebaseAuth = getAuth(firebaseApp);
  }
}
