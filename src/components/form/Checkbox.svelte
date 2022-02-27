<script lang="ts">
	export let key: string;
	export let checked: boolean;
	export let text: string;
</script>

<div class="relative">
	<div class="flex">
		<label for="red-flag--{key}" class:checked>{text}</label>
		<input type="checkbox" id="red-flag--{key}" name="name" bind:checked hidden />
	</div>
</div>

<style>
	label {
		cursor: pointer;
		margin-left: 50px;
	}

	label::before {
		content: '';
		left: 0;
		top: 3px;
		position: absolute;
		display: inline-block;
		width: 35px;
		height: 22px;
		border: 1px solid var(--color-gray);
		background-color: var(--color-white);
		border-radius: 11px;
		margin-right: 10px;
		transition-duration: 0.3s;
	}

	label::after {
		content: '';
		position: absolute;
		top: 6px;
		left: 3px;
		display: inline-block;
		width: 16px;
		height: 16px;
		background-color: var(--color-gray-dark);
		border-radius: 50%;
		transition-duration: 0.3s;
	}

	label.checked::before {
		background-color: var(--color-black);
		border-color: var(--color-black);
	}

	label.checked::after {
		left: 15px;
		background-color: var(--color-white);
	}

	label.checked {
		text-decoration: underline;
	}
</style>
