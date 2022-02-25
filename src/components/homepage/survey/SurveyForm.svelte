<script lang="ts" context="module">
	export type OfficeStoryInputErrors = Partial<Record<keyof OfficeStoryInput, string[]>>;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import SubmitBtn from '$src/components/buttons/SubmitBtn.svelte';
	import { AppError } from '$src/errors';
	import type { OfficeStoryInput } from '$src/firebase/office/shema';
	import { addSurvey } from '$src/firebase/survey/addSurvey';
	import { RedFlagsDisplayNames, RedFlagsValues } from '$src/firebase/survey/shema';
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

	const handleSubmit = async () => {
		const flags = redFlagsToArray(redFlags);
		const data = constructSurveyInputFromOfficeInputAndRedFlags(officeStory, flags);

		try {
			surveyFormSchema.validateSync(data, { abortEarly: false });
		} catch (err) {
			validateInputs();
			return;
		}

		isLoading = true;
		const result = await addSurvey(data);
		isLoading = false;

		if (!(result instanceof AppError)) {
			goto(`survey/thanks?id=${result.id}`);
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit} class="survey__form">
	<SurveyStory
		{officeStory}
		{errors}
		{validateInputs}
		{handleOfficeNameChange}
		{handleCityChange}
		{handleSelectCountry}
		{handleStoryChange}
	/>

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
	.survey__form div:first-child,
	.survey__form div:nth-child(4) {
		flex-basis: 100%;
	}

	.submit {
		margin-top: var(--spacing-xxl);
		display: flex;
		justify-content: center;
	}
</style>
