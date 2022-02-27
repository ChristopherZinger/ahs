import { initializeApp } from 'firebase/app';
import type { FirebaseOptions } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import config from './config';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

class AppFirebase {
	private firebase: FirebaseApp;
	private auth: Auth;
	private firestore: Firestore;

	constructor(config: FirebaseOptions) {
		this.firebase = initializeApp(config);
		this.auth = getAuth(this.firebase);
		this.firestore = getFirestore(this.firebase);

		this.initFirebaseFunctionsEmulator();
		this.initFirebaseFirestoreEmulator();
	}

	private initFirebaseFunctionsEmulator() {
		console.log('Starting firebase functions emulator.');
		const functions = getFunctions(this.firebase);
		connectFunctionsEmulator(functions, 'localhost', 5001);
	}

	private initFirebaseFirestoreEmulator() {
		console.log('Starting firebase firestore emulator.');
		connectFirestoreEmulator(this.firestore, 'localhost', 8080);
	}

	public getFirebase() {
		return this.firebase;
	}

	public getAuth() {
		return this.auth;
	}

	public getFirestore() {
		return this.firestore;
	}
}

export const app = new AppFirebase(config);
