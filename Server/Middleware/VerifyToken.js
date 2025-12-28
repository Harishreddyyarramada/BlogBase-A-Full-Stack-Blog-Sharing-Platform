const admin = require('firebase-admin');
const serviceAccount = require('../Config/GoogleService.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function verifyFirebaseToken(idToken) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    throw new Error('Invalid Firebase ID token');
  }
}

module.exports = { verifyFirebaseToken };
