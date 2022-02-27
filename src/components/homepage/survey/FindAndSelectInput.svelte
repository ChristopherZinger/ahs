<script lang="ts">
	import InvalidInputMessageList from './InvalidInputMessageList.svelte';

	export let label: string;
	export let name: string;
	export let onSelect: (val: string) => void;
	export let value: string;
	export let options: { val: string; display: string }[];
	export let errors: string[];
	export let validateInputs: () => void;

	$: touched = false;

	let searchInput: undefined | HTMLInputElement;

	const handleClickOnOption = (val: string) => {
		if (options.map((o) => o.val).includes(val) && searchInput) {
			onSelect(val);
			searchInput.value = options.find((o) => o.val === val)?.display || '';
		}
		isFocused = false;
	};

	const handleSearchInput = (val: string) => {
		_options = options.filter((o) => o.display.toLowerCase().includes(val.toLowerCase()));
	};

	const handleBlur = () => {
		touched = true;
		setTimeout(() => {
			isFocused = false;
			const typed = options.find(
				(o) => o.display.toLowerCase() === searchInput?.value.toLowerCase()
			);
			if (searchInput) {
				if (typed) {
					onSelect(typed.val);
					searchInput.value = typed.display;
				} else {
					onSelect('');
					searchInput.value = '';
				}
			}

			_options = options;
			validateInputs();
		}, 200);
	};

	$: isFocused = false;
	$: _options = options;
</script>

<div>
	<div class="text-option-input-wrapper animate-label">
		<label for={name} class:hasValue={!!value}>{label}</label>
		<input
			class="underline-input"
			type="text"
			id={name}
			name="office-country"
			autocomplete="off"
			bind:this={searchInput}
			on:input={(e) => handleSearchInput(e.currentTarget.value)}
			on:focus={() => {
				isFocused = true;
			}}
			on:blur={handleBlur}
			{value}
		/>
		<ul class="option-list" class:isHidden={!isFocused}>
			{#if _options.length}
				{#each _options as option}
					<li class="option-item" on:click={() => handleClickOnOption(option.val)}>
						{option.display}
					</li>
				{/each}
			{:else}
				<li class="option-item">No results.</li>
			{/if}
		</ul>
	</div>

	{#if touched && errors.length}
		<InvalidInputMessageList errorMessages={errors} />
	{/if}
</div>

<style>
	.text-option-input-wrapper {
		position: relative;
	}

	.option-list {
		position: absolute;
		background-color: var(--color-white);
		border: 1px solid var(--color-black);
		max-height: 400px;
		list-style: none;
		width: 100%;
		padding: 0;
		overflow-y: scroll;
		display: block;
		z-index: 1;
	}

	.option-list.isHidden {
		display: none;
	}

	.option-item {
		padding: 10px;
		cursor: pointer;
		transition-duration: 0.1s;
	}
	.option-item:hover {
		background-color: var(--color-gray-light);
		padding-left: var(--spacing);
		font-style: italic;
	}
</style>
