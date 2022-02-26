<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SurveyForm from '$src/components/homepage/survey/SurveyForm.svelte';
	import { AppError } from '$src/errors';
	import { addSurvey } from '$src/firebase/survey/addSurvey';
	import type { SurveyInput } from '$src/firebase/survey/shema';

	const currentPath = $page.url.pathname;

	async function onSubmit(data: SurveyInput) {
		// const result = await addSurvey(data);

		// if (result instanceof AppError) {
		// 	return;
		// }

		goto(`${currentPath}/thanks`);
	}
</script>

<SurveyForm {onSubmit} />
