import type { ValidationError } from 'yup';

export function sortYupErrorsByInput(errors: ValidationError[]): Record<string, string[]> {
	return errors.reduce((acc, err): Record<string, string[]> => {
		if (!err.path) {
			return acc;
		}
		if (acc[err.path]) {
			acc[err.path].push(err.message);
		} else {
			acc[err.path] = [err.message];
		}
		return acc;
	}, {} as Record<string, string[]>);
}
