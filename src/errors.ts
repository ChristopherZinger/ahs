export type AppErrors = Error | AppError | FS_ReadError | FS_WriteError;
export class AppError extends Error {
	constructor(
		public message: string = 'App Error',
		public originalError?: Error,
		public info: string[] = []
	) {
		super();
	}
}

export class FS_ReadError extends AppError {
	constructor(public message: string, public originalError?: Error, public info: string[] = []) {
		super('Permission Error', originalError, info);
	}
}

export class FS_WriteError extends AppError {
	constructor(public message: string, public originalError?: Error, public info: string[] = []) {
		super('Permission Error', originalError, info);
	}
}
