<script lang="ts">
	export let disabled: boolean = false;
	export let loading: boolean = false;
</script>

<button
	type="submit"
	class:isLoading={loading}
	class:isDisabled={disabled}
	disabled={loading || disabled}><slot /></button
>

<style>
	button {
		padding: 10px 20px;
		border: 3px solid var(--color-black);
		background-color: transparent;
		font-size: 14px;
		display: block;
		width: 100%;
		cursor: pointer;
		margin: auto;
	}

	button.isLoading,
	button.isDisabled {
		cursor: no-drop;
		color: var(--color-gray);
		border-color: var(--color-gray-light);
	}
</style>
