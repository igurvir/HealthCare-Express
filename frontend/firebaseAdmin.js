const admin = require('firebase-admin');

// Initialize Firebase Admin SDK using your service account credentials
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'healthcareexpress-f966c', // Your Firebase project ID
    privateKey: 'AIzaSyCXzIs5pF5vmkBcn3VDYYscjbbv4-Xp-IQ', // Your Firebase private key
    clientEmail: 'chutiyapadhai@gmail.com', // Your Firebase client email
  }),
});

module.exports = admin;
