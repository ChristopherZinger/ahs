<script lang="ts" context="module">
	export type OfficeStoryInputErrors = Partial<Record<keyof OfficeStoryInput, string[]>>;
</script>

<script lang="ts">
	import SubmitBtn from '$src/components/buttons/SubmitBtn.svelte';
	import type { OfficeStoryInput } from '$src/firebase/office/shema';
	import { RedFlagsDisplayNames, RedFlagsValues, SurveyInput } from '$src/firebase/survey/shema';
	import {
		constructSurveyInputFromOfficeInputAndRedFlags,
		redFlagsToArray
	} from '$src/helpers/survey';
	import { setOfficeName } from '$src/stores/surveyModeStore';
	import SurveyRedFlags from './SurveyRedFlags.svelte';
	import SurveyStory from './SurveyStory.svelte';
	import { surveyFormSchema } from '$src/firebase/office/officeStoryValidator';
	import InvalidInputMessageList from './InvalidInputMessageList.svelte';
	import { sortYupErrorsByInput } from '$src/firebase/utils/sortValidationErrorsByInput';

	export let onSubmit: (data: SurveyInput) => Promise<void>;
	export const officeStory: OfficeStoryInput = {
		office: '',
		city: '',
		country: '',
		story: ''
	};

	$: errors = {};
	$: isLoading = false;
	let redFlags = Object.entries(RedFlagsDisplayNames).reduce((acc, [categoryKey, category]) => {
		return {
			...acc,
			[categoryKey]: Object.entries(category).reduce((acc, [flagKey]) => ({ [flagKey]: false }), {})
		};
	}, {} as RedFlagsValues);

	const handleOfficeNameChange = (val: string) => {
		officeStory.office = val;
		setOfficeName(val);
	};

	const handleCityChange = (val: string) => {
		officeStory.city = val;
	};

	const handleSelectCountry = (val: string) => {
		if (officeStory.country !== val) {
			officeStory.country = val;
		}
	};

	const handleStoryChange = (val: string) => {
		officeStory.story = val;
	};

	const updateInputErrorMessages = (_errors: OfficeStoryInputErrors) => {
		errors = _errors;
	};

	const validateInputs = () => {
		try {
			surveyFormSchema.validateSync(officeStory, { abortEarly: false });
			updateInputErrorMessages({});
		} catch (err) {
			updateInputErrorMessages(sortYupErrorsByInput(err.inner));
		}
	};

	async function handleSubmit() {
		const flags = redFlagsToArray(redFlags);
		const data = constructSurveyInputFromOfficeInputAndRedFlags(officeStory, flags);

		try {
			surveyFormSchema.validateSync(data, { abortEarly: false });
		} catch (err) {
			validateInputs();
			return;
		}

		isLoading = true;
		await onSubmit(data);
		isLoading = false;
	}
</script>

<h5>Your Story</h5>

<form on:submit|preventDefault={handleSubmit} class="pb-10">
	<div class="mb-20">
		<SurveyStory
			{officeStory}
			{errors}
			{validateInputs}
			{handleOfficeNameChange}
			{handleCityChange}
			{handleSelectCountry}
			{handleStoryChange}
		/>
	</div>

	<SurveyRedFlags {redFlags} />

	<div class="submit">
		<SubmitBtn isDisabled={isLoading || !!Object.keys(errors).length}>Submit</SubmitBtn>
	</div>
	{#if !!Object.keys(errors).length}
		<div style="text-align: center">
			<InvalidInputMessageList
				errorMessages={[
					`Fields: ${Object.keys(errors).map((f) => ' ' + f)} are invalid. Please correct them. `
				]}
			/>
		</div>
	{/if}
</form>

<style>
	.submit {
		margin-top: var(--spacing-xxl);
		display: flex;
		justify-content: center;
	}
</style>
