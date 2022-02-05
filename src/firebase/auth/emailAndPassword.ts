import { AppError } from './../../errors';
import { app } from './../appFirebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { Auth, UserCredential } from 'firebase/auth';

export const FS_AUTH_ERR_CODES = {
	EMAIL_ALREADY_EXISTS: 'auth/email-already-exists'
};

class AuthEmailAndPassword {
	constructor(private auth: Auth) {}

	public async signup(email: string, password: string): Promise<UserCredential | Error> {
		try {
			return await createUserWithEmailAndPassword(this.auth, email, password);
		} catch (error) {
			return new AppError(FS_AUTH_ERR_CODES.EMAIL_ALREADY_EXISTS, error);
		}
	}
}

const auth = app.getAuth();
export const authEmailAndPassword = new AuthEmailAndPassword(auth);
