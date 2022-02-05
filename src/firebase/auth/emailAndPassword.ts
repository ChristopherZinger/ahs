import { AppError, APP_ERROR_CODES } from './../../errors';
import { app } from './../appFirebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { Auth, UserCredential } from 'firebase/auth';

class AuthEmailAndPassword {
	constructor(private auth: Auth) {}

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

	public async logout(): Promise<void> {
		await signOut(this.auth);
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
