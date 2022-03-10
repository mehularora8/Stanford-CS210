import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/* Firebase Setup */
const firebaseConfig = {
  apiKey: 'AIzaSyApwcLq6zs_TCUavgap-G8MFjq6QtpH8nc',
  authDomain: 'cs210-parea.firebaseapp.com',
  databaseURL: 'https://cs210-parea-default-rtdb.firebaseio.com/',
  projectId: 'cs210-parea',
  storageBucket: 'cs210-parea.appspot.com',
  messagingSenderId: '1093038960119',
  appId: 'app-1-1093038960119-ios-f5df5c908428a2750292f2',
};

initializeApp(firebaseConfig);
var firestoreDb = getFirestore();

export default firestoreDb;
