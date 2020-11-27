const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.checkAlias = functions.https.onCall((data, context) => {
  const ref = admin
    .firestore()
    .collection('users')
    .doc(data.slug)
  return ref.get().then(doc => {
    return { unqiue: !doc.exists }
  }).catch(() => {
    throw new functions.https.HttpsError('Failed to connect!')
  })
})
