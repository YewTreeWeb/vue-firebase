import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXcCzKAQY2e31ZFnzSy9-x5gWmD2TPUo0",
  authDomain: "ninja-chat-vue-1.firebaseapp.com",
  databaseURL: "https://ninja-chat-vue-1.firebaseio.com",
  projectId: "ninja-chat-vue-1",
  storageBucket: "ninja-chat-vue-1.appspot.com",
  messagingSenderId: "771056640098",
  appId: "1:771056640098:web:e93e9d9b4c68621f06313b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })
const firebaseApp = firebase.firestore();
// Export firestore database
export default firebaseApp;
