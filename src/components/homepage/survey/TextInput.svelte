<script lang="ts">
	import InvalidInputMessageList from './InvalidInputMessageList.svelte';

	export let name: string;
	export let label: string;
	export let onBlur: (val: string) => void;
	export let onInput: (val: string) => void;
	export let value: string;
	export let errors: string[] = [];

	$: touched = false;
	$: _errors = errors;

	const handleBlur = (val: string) => {
		touched = true;
		onBlur(val);
	};

	const handleInput = (val: string) => {
		onInput(val);
	};
</script>

<div class="text-input-wrapper">
	<label for={name}>{label}</label>
	<input
		type="text"
		{name}
		{value}
		on:input={(e) => handleInput(e.currentTarget.value)}
		on:blur={(e) => handleBlur(e.currentTarget.value)}
	/>
	{#if touched && _errors && _errors.length}
		<InvalidInputMessageList errorMessages={_errors} />
	{/if}
</div>

<style>
	label {
		display: block;
		margin-bottom: var(--spacing-s);
	}
	.text-input-wrapper {
		flex-grow: 1;
		width: 100%;
	}
</style>
