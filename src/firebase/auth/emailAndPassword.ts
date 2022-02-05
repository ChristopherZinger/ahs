import { AppError, APP_ERROR_CODES } from './../../errors';
import { app } from './../appFirebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import type { Auth, UserCredential } from 'firebase/auth';

class AuthEmailAndPassword {
	constructor(private auth: Auth) {}

	public async signup(email: string, password: string): Promise<UserCredential | AppError> {
		try {
			return await createUserWithEmailAndPassword(this.auth, email, password);
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				return new AppError({
					code: APP_ERROR_CODES.auth.emailAlreadyExists,
					error
				});
			}
			return new AppError({ error });
		}
	}

	public async login(email: string, password: string): Promise<UserCredential | AppError> {
		try {
			return await signInWithEmailAndPassword(this.auth, email, password);
		} catch (error) {
			if (error.code === APP_ERROR_CODES.auth.invalidePassword) {
				return new AppError({
					code: APP_ERROR_CODES.auth.invalidePassword,
					error
				});
			}
			return new AppError({ error });
		}
	}
}

const auth = app.getAuth();
export const authEmailAndPassword = new AuthEmailAndPassword(auth);
