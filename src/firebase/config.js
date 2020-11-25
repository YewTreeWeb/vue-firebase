import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD44kQmysP1RIZQH0D2sSXcLf3a07JTtsE',
  authDomain: 'geo-ninjas-1.firebaseapp.com',
  databaseURL: 'https://geo-ninjas-1.firebaseio.com',
  projectId: 'geo-ninjas-1',
  storageBucket: 'geo-ninjas-1.appspot.com',
  messagingSenderId: '535367514442',
  appId: '1:535367514442:web:38490df33ff0045365e9b3'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timestampsInSnapshots: true })

const firebaseApp = firebase.firestore()
// Export firestore database
export default firebaseApp
