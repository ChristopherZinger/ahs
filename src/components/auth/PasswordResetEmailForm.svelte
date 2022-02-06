<script lang="ts">
	import TextInput from '$src/components/form/TextInput.svelte';
	import { AppError } from '$src/errors';
	import { authEmailAndPassword } from '$src/firebase/auth/emailAndPassword';
	import { getRemoteSettings } from '$src/firebase/settings/getFirestoreSettings';
	import { sortYupErrorsByInput } from '$src/firebase/utils/sortValidationErrorsByInput';
	import * as yup from 'yup';
	import SubmitButton from '../form/SubmitButton.svelte';

	export let onSubmit: () => void;

	let appURL: string | undefined;

	getRemoteSettings().then((result) => {
		if (result instanceof AppError) {
			errors.email = ['Unexpected error occured. Try again another time.'];
		} else {
			appURL = result.appURL;
		}
	});

	const inputValues = {
		email: ''
	};

	let errors: Partial<Record<keyof typeof inputValues, string[]>> = {};

	const loginSchema = yup.object({
		email: yup.string().email().required()
	});

	async function submit(): Promise<void> {
		loading = true;
		await authEmailAndPassword.sendPasswordResetEmail(inputValues.email);
		loading = false;
		onSubmit();
	}

	function validate(): void {
		try {
			loginSchema.validateSync(inputValues, { abortEarly: false });
			errors = {};
		} catch (_errors) {
			errors = sortYupErrorsByInput(_errors.inner);
		}
	}

	function handleBlur(inputName: keyof typeof inputValues): void {
		validate();
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
		onBlur={() => handleBlur('email')}
		type="email"
		label="*Email"
		name="email"
		id="email"
		errors={errors.email || []}
	/>

	<SubmitButton disabled={disableSubmit} {loading}>Send Email With Password Reset</SubmitButton>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		row-gap: 50px;
		align-items: center;
	}
</style>
