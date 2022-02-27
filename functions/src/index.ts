import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const firebase = admin.initializeApp();
const firestore = firebase.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((_, response) => {
	functions.logger.info('Hello logs!', { structuredData: true });
	response.send('Hello from Firebase!');
});
