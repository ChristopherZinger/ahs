<script lang="ts">
	import type { OfficeStoryInput } from '$src/firebase/office/shema';
	import { countries } from '$src/helpers/countries';
	import FindAndSelectInput from './FindAndSelectInput.svelte';
	import type { OfficeStoryInputErrors } from './SurveyForm.svelte';
	import TextareaInput from './TextareaInput.svelte';
	import TextInput from './TextInput.svelte';

	export let officeStory: OfficeStoryInput;
	export let errors: OfficeStoryInputErrors;
	export let validateInputs: () => void;
	export let handleOfficeNameChange: (val: string) => void;
	export let handleCityChange: (val: string) => void;
	export let handleSelectCountry: (val: string) => void;
	export let handleStoryChange: (val: string) => void;
</script>

<div class="survey__story">
	<div>
		<TextInput
			name="office-name"
			label="Office name"
			errors={errors.office || []}
			onBlur={validateInputs}
			onInput={handleOfficeNameChange}
			value={officeStory.office}
		/>
	</div>

	<div>
		<TextInput
			name="city"
			label="City"
			errors={errors.city || []}
			onBlur={validateInputs}
			onInput={handleCityChange}
			value={officeStory.city}
		/>
	</div>

	<div>
		<FindAndSelectInput
			label="Country"
			name="country"
			options={countries.map((c) => ({ display: c.name, val: c.code }))}
			onSelect={handleSelectCountry}
			value={countries.find((c) => c.code === officeStory.country)?.name || ''}
			errors={errors.country || []}
			{validateInputs}
		/>
	</div>

	<div>
		<TextareaInput
			label="Your Story"
			name="story"
			onBlur={(i) => {
				validateInputs();
			}}
			onInput={(i) => {
				handleStoryChange(i);
				validateInputs();
			}}
			errors={errors.story || []}
			value={officeStory.story}
			maxLength={2500}
		/>
	</div>
</div>

<style>
	.survey__story {
		display: flex;
		flex-wrap: wrap;
		column-gap: var(--spacing-m);
		row-gap: var(--spacing-m);
	}

	@media only screen and (min-width: 786px) {
		.survey__story > div {
			flex-basis: calc((100% - (var(--spacing-m) * 2)) / 2);
		}

		.survey__story > div:first-child {
			flex-basis: 100%;
		}

		.survey__story > div:nth-child(4) {
			width: 600px;
			margin: auto;
			flex-grow: 0;
			flex-basis: auto;
		}
	}
</style>
