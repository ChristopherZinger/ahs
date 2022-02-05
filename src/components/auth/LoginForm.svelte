<script lang="ts">
	import TextInput from '$src/components/form/TextInput.svelte';
	import { AppError, APP_ERROR_CODES } from '$src/errors';
	import { authEmailAndPassword } from '$src/firebase/auth/emailAndPassword';
	export let onSubmit: () => void;

	let password: string = '';
	let email: string = '';

	async function submit(): Promise<void> {
		const result = await authEmailAndPassword.login(password, email);
		if (result instanceof AppError) {
			if (result.code === APP_ERROR_CODES.auth.invalidePassword) {
				console.log('invalid password');
			}
			console.log('something went wrong');
		}

		onSubmit();
	}

	$: {
		password, email;
	}
</script>

<form on:submit|preventDefault={submit}>
	<TextInput
		value={email}
		onChange={(v) => {
			email = v;
		}}
		type="email"
		label="*Email"
		name="email"
		id="email"
	/>

	<TextInput
		value={password}
		onChange={(v) => {
			password = v;
		}}
		type="password"
		label="*Password"
		name="password"
		id="password"
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
