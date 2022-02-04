<script lang="ts">
	import TextInput from '$src/components/form/TextInput.svelte';
	import SubmitBtn from '$src/components/form/SubmitButton.svelte';
	import SelectInput from '../form/SelectInput.svelte';

	export let onSubmit: () => void;

	let username = '';
	let sex = '';
	let position = '';
	let yearsOfExperience = '';

	function submit() {
		onSubmit();
	}

	let options = [
		{ value: 'man', name: 'Man' },
		{ value: 'woman', name: 'Woman' },
		{ value: 'other', name: 'Other' }
	];
</script>

<form on:submit|preventDefault={submit}>
	<TextInput
		label="*Username"
		name="username"
		id="username"
		type="text"
		onChange={(v) => {
			username = v;
		}}
		value={username}
	/>

	<SelectInput label="*Gender" name="sex" id="sex" {options} />

	<TextInput
		label="*Position"
		name="position"
		id="position"
		type="text"
		onChange={(v) => {
			position = v;
		}}
		value={position}
	/>

	<TextInput
		label="*Years of experience"
		name="experience"
		id="experience"
		type="number"
		onChange={(v) => {
			yearsOfExperience = v;
		}}
		value={yearsOfExperience}
	/>

	<SubmitBtn>Done</SubmitBtn>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		row-gap: 50px;
	}
</style>
