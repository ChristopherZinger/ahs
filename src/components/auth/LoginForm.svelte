<script lang="ts">
	import TextInput from '$src/components/form/TextInput.svelte';
	import { AppError, APP_ERROR_CODES } from '$src/errors';
	import { authEmailAndPassword } from '$src/firebase/auth/emailAndPassword';
	import { sortYupErrorsByInput } from '$src/firebase/utils/sortValidationErrorsByInput';
	import * as yup from 'yup';

	export let onSubmit: () => void;

	const inputValues = {
		password: '',
		email: ''
	};

	const touchedInputs = new Set();
	let errors: Partial<Record<keyof typeof inputValues, string[]>> = Object.keys(inputValues).reduce(
		(acc, key) => {
			return {
				...acc,
				[key]: []
			};
		},
		{}
	);

	const loginSchema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().required()
	});

	async function submit(): Promise<void> {
		const { password, email } = inputValues;
		const result = await authEmailAndPassword.login(email, password);
		if (result instanceof AppError) {
			if (result.code === APP_ERROR_CODES.auth.wrongPassword) {
				errors.password = ['Wrong password.'];
			}
			if (result.code === APP_ERROR_CODES.auth.invalidEmail) {
				errors.email = ['Invalid email.'];
			}
			console.log({ ...result });
		}
		onSubmit();
	}

	function validate(): void {
		try {
			loginSchema.validateSync(inputValues, { abortEarly: false });
			errors = {};
		} catch (_errors) {
			errors = sortYupErrorsByInput(_errors.inner);
			console.log(errors);
		}
	}

	function handleBlur(inputName: keyof typeof inputValues): void {
		inputValues[inputName] && touchedInputs.add(inputName);
		validate();
	}

	$: {
		errors;
	}
</script>

<form on:submit|preventDefault={submit}>
	<TextInput
		value={inputValues.email}
		onChange={(v) => {
			inputValues.email = v;
			validate();
		}}
		onBlur={() => handleBlur('email')}
		type="email"
		label="*Email"
		name="email"
		id="email"
		errors={(touchedInputs.has('email') ? errors.email : []) || []}
	/>

	<TextInput
		value={inputValues.password}
		onChange={(v) => {
			inputValues.password = v;
			validate();
		}}
		onBlur={() => handleBlur('password')}
		type="password"
		label="*Password"
		name="password"
		id="password"
		errors={(touchedInputs.has('password') ? errors.password : []) || []}
	/>

	<button type="submit">Login</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		row-gap: 50px;
		align-items: center;
	}
	button {
		padding: 10px 20px;
		border: 3px solid var(--color-black);
		background-color: transparent;
		font-size: 14px;
		display: block;
		width: 200px;
		cursor: pointer;
		margin: auto;
	}
</style>
