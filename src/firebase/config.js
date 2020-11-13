import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCLjKRyjZbStBPOpWemTG-p8nAtdtskVro',
  authDomain: 'ninja-smoothies-5f1a2.firebaseapp.com',
  databaseURL: 'https://ninja-smoothies-5f1a2.firebaseio.com',
  projectId: 'ninja-smoothies-5f1a2',
  storageBucket: 'ninja-smoothies-5f1a2.appspot.com',
  messagingSenderId: '744844605843',
  appId: '1:744844605843:web:fda3af1494b703dedfd066'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })
const firebaseApp = firebase.firestore()
// Export firestore database
export default firebaseApp
