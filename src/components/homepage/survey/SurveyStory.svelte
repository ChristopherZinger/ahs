<script lang="ts">
	import type { OfficeStoryInput } from '$src/firebase/office/shema';
	import { countries } from '$src/helpers/countries';
	import FindAndSelectInput from './FindAndSelectInput.svelte';
	import type { OfficeStoryInputErrors } from './SurveyForm.svelte';
	import TextareaInput from './TextareaInput.svelte';
	import TextInput from '$src/components/form/TextInput.svelte';

	export let officeStory: OfficeStoryInput;
	export let errors: OfficeStoryInputErrors;
	export let validateInputs: () => void;
	export let handleOfficeNameChange: (val: string) => void;
	export let handleCityChange: (val: string) => void;
	export let handleSelectCountry: (val: string) => void;
	export let handleStoryChange: (val: string) => void;
</script>

<div class="flex flex-wrap space-x-10 mb-10">
	<div class="grow">
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

	<div class="grow">
		<TextInput
			id="office-city"
			name="office-city"
			label="City"
			type="text"
			value={officeStory.city}
			onBlur={validateInputs}
			onChange={handleCityChange}
			errors={errors.city || []}
		/>
	</div>
</div>

<div class="flex mb-10">
	<div class="grow">
		<TextInput
			id="office-name"
			name="office-name"
			label="Office Name"
			type="text"
			value={officeStory.office}
			onBlur={validateInputs}
			onChange={handleCityChange}
			errors={errors.office || []}
		/>
	</div>
</div>

<div class="flex mb-10">
	<div class="grow">
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
