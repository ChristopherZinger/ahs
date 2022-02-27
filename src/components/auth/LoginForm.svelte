<script lang="ts">
	import TextInput from '$src/components/form/TextInput.svelte';
	import { AppError, APP_ERROR_CODES } from '$src/errors';
	import { authEmailAndPassword } from '$src/firebase/auth/emailAndPassword';
	import { sortYupErrorsByInput } from '$src/firebase/utils/sortValidationErrorsByInput';
	import * as yup from 'yup';
	import SubmitButton from '../form/SubmitButton.svelte';

	export let onSubmit: () => void;

	const inputValues = {
		password: '',
		email: ''
	};

	let errors: Partial<Record<keyof typeof inputValues, string[]>> = {};

	const loginSchema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().required()
	});

	async function submit(): Promise<void> {
		const { password, email } = inputValues;

		loading = true;
		const result = await authEmailAndPassword.login(email, password);
		loading = false;

		if (result instanceof AppError) {
			if (result.code === APP_ERROR_CODES.auth.wrongPassword) {
				errors.password = ['Wrong password.'];
			}
			if (result.code === APP_ERROR_CODES.auth.invalidEmail) {
				errors.email = ['Invalid email.'];
			}
			if (result.code === APP_ERROR_CODES.auth.userNotFound) {
				errors.email = ["Email doesn't exists."];
			}
		} else {
			onSubmit();
		}
	}

	function validate(): void {
		try {
			loginSchema.validateSync(inputValues, { abortEarly: false });
			errors = {};
		} catch (_errors) {
			errors = sortYupErrorsByInput(_errors.inner);
		}
	}

	$: {
		errors;
	}
	$: disableSubmit = !!Object.keys(errors).length;
	$: loading = false;
</script>

<form on:submit|preventDefault={submit}>
	<TextInput
		value={inputValues.email}
		onChange={(v) => {
			inputValues.email = v;
			validate();
		}}
		onBlur={validate}
		type="email"
		label="*Email"
		name="email"
		id="email"
		errors={errors.email || []}
	/>

	<TextInput
		value={inputValues.password}
		onChange={(v) => {
			inputValues.password = v;
			validate();
		}}
		onBlur={validate}
		type="password"
		label="*Password"
		name="password"
		id="password"
		errors={errors.password || []}
	/>

	<SubmitButton disabled={disableSubmit} {loading}>Login</SubmitButton>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		row-gap: 50px;
		align-items: center;
	}
</style>
