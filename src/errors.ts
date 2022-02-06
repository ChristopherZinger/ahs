export const APP_ERROR_CODES = {
	default: 'something-went-wrong',
	auth: {
		emailAlreadyExists: 'auth/email-already-exists',
		insufficientPermissions: 'auth/insufficient-permission',
		wrongPassword: 'auth/wrong-password',
		invalidEmail: 'auth/invalid-email',
		userNotFound: 'auth/user-not-found'
	}
};

export class AppError extends Error {
	public code: undefined | string;
	public error: unknown;
	public info: undefined | Record<string, unknown>;
	constructor(err?: { code?: string; error?: unknown; info?: Record<string, unknown> }) {
		super();
		const { code, error, info } = err || {};
		this.code = code || APP_ERROR_CODES.default;
		this.error = error;
		this.info = info;
	}
}
