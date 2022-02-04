<script lang="ts">
	import TextInput from '$src/components/form/TextInput.svelte';

	function submit(): void {
		console.log(password, email);
	}

	let password: string = '';

	let email: string = '';

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
