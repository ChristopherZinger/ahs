<script lang="ts">
	import TextInput from '$src/components/form/TextInput.svelte';
	import { authEmailAndPassword } from '$src/firebase/auth/emailAndPassword';
	import * as yup from 'yup';
	import { sortYupErrorsByInput } from '$src/firebase/utils/sortValidationErrorsByInput';
	import { AppError, APP_ERROR_CODES } from '$src/errors';
	import SubmitButton from '../form/SubmitButton.svelte';

	export let onSubmit: () => void;

	const inputData = {
		password: '',
		passwordRepeat: '',
		email: ''
	};

	const touchedInputs = new Set();

	let errors: Partial<Record<keyof typeof inputData, string[]>> = {};

	async function submit(): Promise<void> {
		loading = true;
		const result = await authEmailAndPassword.signup(inputData.email, inputData.password);
		loading = false;

		if (result instanceof AppError) {
			if ((result.code = APP_ERROR_CODES.auth.emailAlreadyExists)) {
				errors.email = ['This email is taken. Choose another one or login.'];
			}
		} else {
			if (!result.user.emailVerified) {
				const verificationEmail = await authEmailAndPassword.setEmailVerification(result.user);
			}
			onSubmit();
		}
	}

	function validate(): void {
		try {
			signupSchema.validateSync(inputData, { abortEarly: false });
			errors = {};
		} catch (_errors) {
			errors = sortYupErrorsByInput(_errors.inner);
		}
	}

	function handleBlur(inputName: keyof typeof inputData): void {
		inputData[inputName] && touchedInputs.add(inputName);
		validate();
	}

	const signupSchema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().required().min(7),
		passwordRepeat: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
	});

	$: {
		errors;
	}
	$: disableSubmit = touchedInputs.size === 0 || !!Object.keys(errors).length;
	$: loading = false;
</script>

<form on:submit|preventDefault={submit}>
	<TextInput
		value={inputData.email}
		onChange={(v) => {
			inputData.email = v;
			validate();
		}}
		onBlur={() => {
			touchedInputs.add('email');
			handleBlur('email');
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
			validate();
		}}
		onBlur={() => {
			touchedInputs.add('password');
			handleBlur('password');
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
			validate();
		}}
		onBlur={() => {
			touchedInputs.add('passwordRepeat');
			handleBlur('passwordRepeat');
		}}
		type="password"
		label="*Password Repeat"
		name="repeat"
		id="repeat"
		errors={(touchedInputs.has('passwordRepeat') ? errors.passwordRepeat : []) || []}
	/>

	<SubmitButton disabled={disableSubmit} {loading}>Next</SubmitButton>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		row-gap: 50px;
		align-items: center;
	}
</style>
