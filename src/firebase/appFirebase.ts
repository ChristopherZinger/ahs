import { initializeApp } from 'firebase/app';
import type { FirebaseOptions } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import config from './config';
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

class AppFirebase {
	private firebase: FirebaseApp;
	private auth: Auth;
	private firestore: Firestore;

	constructor(config: FirebaseOptions) {
		this.firebase = initializeApp(config);
		this.auth = getAuth(this.firebase);
		this.firestore = getFirestore(this.firebase);
	}

	public init() {
		console.log('init app');
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
