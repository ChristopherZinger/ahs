<script lang="ts">
	import InvalidInputMessageList from './InvalidInputMessageList.svelte';

	export let label: string;
	export let name: string;
	export let value: string;
	export let onBlur: (val: string) => void;
	export let onInput: (val: string) => void;
	export let errors: string[];
	export let maxLength: number | undefined;

	$: touched = false;
	$: _errors = errors;

	const handleBlur = (val: string) => {
		touched = true;
		onBlur(val);
	};
</script>

<div>
	<label for={name}>{label}</label>
	<textarea
		id={name}
		{name}
		{value}
		on:input={(e) => onInput(e.currentTarget.value)}
		on:blur={(e) => handleBlur(e.currentTarget.value)}
	/>
	{#if maxLength && value.length > 10}
		<span>{maxLength - value.length} characters left.</span>
	{/if}

	{#if touched && _errors && _errors.length}
		<InvalidInputMessageList errorMessages={_errors} />
	{/if}
</div>

<style>
	textarea {
		height: 200px;
	}

	span {
		font-size: 14px;
	}

	label {
		display: block;
		margin-bottom: var(--spacing-s);
	}
</style>
