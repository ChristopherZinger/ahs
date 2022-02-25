<script lang="ts">
	import InvalidInputMessageList from '../homepage/survey/InvalidInputMessageList.svelte';

	export let id: string;
	export let label: string;
	export let value: string;
	export let name: string;
	export let type: 'text' | 'email' | 'password' | 'number' = 'text';
	export let onChange: (value: string) => void;
	export let onBlur: (value: string) => void = () => {};
	export let errors: string[] = [];

	type InputEvent = Event & {
		currentTarget: EventTarget & HTMLInputElement;
	};

	$: touched = false;

	function handleBlur(e: InputEvent) {
		if (e.currentTarget.value) {
			touched = true;
		}
		onBlur(e.currentTarget.value);
	}
</script>

<div class="text-input">
	<div class="underline-input animate-label">
		<label for={id} class:hasValue={!!value}>{label}</label>
		<input
			{type}
			{id}
			{name}
			on:input={(e) => onChange(e.currentTarget.value)}
			on:blur={handleBlur}
			{value}
		/>
	</div>
	{#if touched}
		<InvalidInputMessageList errorMessages={errors} />
	{/if}
</div>

<style>
	.text-input {
		width: 100%;
	}

	.underline-input {
		border-bottom: 2px solid var(--color-black);
		width: 100%;
	}

	.underline-input input:active,
	input:focus {
		border: none;
	}

	.animate-label label {
		transition-duration: 0.3s;
		transform: translateY(30px);
		display: block;
	}

	.animate-label label.hasValue {
		transform: translateY(0);
	}

	.animate-label:focus-within label {
		transform: translateY(0);
	}
</style>
