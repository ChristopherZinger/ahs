import { getRemoteSettings } from './../settings/getFirestoreSettings';
import { AppError, APP_ERROR_CODES } from './../../errors';
import { app } from './../appFirebase';
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
import type { Auth, UserCredential } from 'firebase/auth';
import { PATHS } from '../paths';

class BaseAuth {
	constructor(protected auth: Auth) {}

	public async logout(): Promise<void> {
		await signOut(this.auth);
	}

	public async sendPasswordResetEmail(email: string): Promise<void | AppError> {
		let url;
		const remoteSettings = await getRemoteSettings();
		if (!(remoteSettings instanceof AppError)) {
			url = remoteSettings.appURL + PATHS.auth.login;
		}
		await sendPasswordResetEmail(this.auth, email, url ? { url } : undefined);
	}
}

class AuthEmailAndPassword extends BaseAuth {
	constructor(auth: Auth) {
		super(auth);
	}

	public async signup(email: string, password: string): Promise<UserCredential | AppError> {
		try {
			return await createUserWithEmailAndPassword(this.auth, email, password);
		} catch (error) {
			return this.handleErrors(error);
		}
	}

	public async login(email: string, password: string): Promise<UserCredential | AppError> {
		try {
			return await signInWithEmailAndPassword(this.auth, email, password);
		} catch (error) {
			return this.handleErrors(error);
		}
	}

	private handleErrors(error: any): AppError {
		const { code } = error || {};
		return Object.values(APP_ERROR_CODES.auth).includes(code)
			? new AppError({
					code,
					error
			  })
			: new AppError({ error });
	}
}

const auth = app.getAuth();
export const authEmailAndPassword = new AuthEmailAndPassword(auth);
