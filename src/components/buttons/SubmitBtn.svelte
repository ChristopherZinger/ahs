<script lang="ts">
	export let isDisabled: boolean = false;
</script>

<button type="submit" disabled={isDisabled}><slot /></button>

<style>
	button,
	button:focus,
	button:active {
		border: 2px solid var(--color-gray);
		border-radius: 0;
		outline: none;
		padding: var(--spacing-s) var(--spacing-xxl);
		background-color: var(--color-white);
		transition-duration: 0.3s;
		font-size: 20px;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--color-orange);
		border-color: var(--color-orange);
		color: white;
		font-weight: 900;
	}
	button:disabled {
		color: var(--color-gray);
		background-color: var(--color-gray-light);
		border-color: var(--color-gray);
		font-weight: normal;
		cursor: not-allowed;
	}

	@media only screen and (max-width: 785px) {
		button {
			width: 100%;
		}
	}
</style>
