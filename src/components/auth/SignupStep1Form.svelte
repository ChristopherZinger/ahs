<script lang="ts">
	import TextInput from '$src/components/form/TextInput.svelte';
	import SubmitBtn from '$src/components/form/SubmitButton.svelte';
	import { authEmailAndPassword } from '$src/firebase/auth/emailAndPassword';
	import * as yup from 'yup';
	import { sortYupErrorsByInput } from '$src/firebase/utils/sortValidationErrorsByInput';
	import { AppError, APP_ERROR_CODES } from '$src/errors';

	export let onSubmit: () => void;

	const inputData = {
		password: '',
		passwordRepeat: '',
		email: ''
	};

	const touchedInputs = new Set();

	let errors: Partial<Record<keyof typeof inputData, string[]>> = {};

	async function submit(): Promise<void> {
		const inputErrors = hasInputDataErrors({ ...inputData });

		if (inputErrors) {
			updateUiErrors(inputErrors);
			return;
		}

		const result = await authEmailAndPassword.signup(inputData.email, inputData.password);

		if (result instanceof AppError) {
			if ((result.code = APP_ERROR_CODES.auth.emailAlreadyExists)) {
				errors.email = ['This email is taken. Choose another one or login.'];
			}
		} else {
			onSubmit();
		}
	}

	function updateUiErrors(_errors: Record<string, string[]>): void {
		errors = _errors;
	}

	const signupSchema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().required().min(7),
		passwordRepeat: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
	});

	function hasInputDataErrors(data: {
		password: string;
		email: string;
		passwordRepeat: string;
	}): void | Record<string, string[]> {
		try {
			signupSchema.validateSync(data, { abortEarly: false });
		} catch (errors) {
			return sortYupErrorsByInput(errors.inner);
		}
	}

	$: {
		errors;
	}
</script>

<form on:submit|preventDefault={submit}>
	<TextInput
		value={inputData.email}
		onChange={(v) => {
			inputData.email = v;
			if (touchedInputs.has('email')) {
				updateUiErrors(hasInputDataErrors(inputData) || {});
			}
		}}
		onBlur={() => {
			touchedInputs.add('email');
			updateUiErrors(hasInputDataErrors(inputData) || {});
		}}
		type="email"
		label="*Email"
		name="email"
		id="email"
		errors={(touchedInputs.has('email') ? errors.email : []) || []}
	/>

	<TextInput
		value={inputData.password}
		onChange={(v) => {
			inputData.password = v;
			if (touchedInputs.has('password')) {
				updateUiErrors(hasInputDataErrors(inputData) || {});
			}
		}}
		onBlur={() => {
			touchedInputs.add('password');
			updateUiErrors(hasInputDataErrors(inputData) || {});
		}}
		type="password"
		label="*Password"
		name="password"
		id="password"
		errors={(touchedInputs.has('password') ? errors.password : []) || []}
	/>

	<TextInput
		value={inputData.passwordRepeat}
		onChange={(v) => {
			inputData.passwordRepeat = v;
			if (touchedInputs.has('passwordRepeat')) {
				updateUiErrors(hasInputDataErrors(inputData) || {});
			}
		}}
		onBlur={() => {
			touchedInputs.add('passwordRepeat');
			updateUiErrors(hasInputDataErrors(inputData) || {});
		}}
		type="password"
		label="*Password Repeat"
		name="repeat"
		id="repeat"
		errors={(touchedInputs.has('passwordRepeat') ? errors.passwordRepeat : []) || []}
	/>

	<SubmitBtn>Next</SubmitBtn>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		row-gap: 50px;
		align-items: center;
	}
</style>
