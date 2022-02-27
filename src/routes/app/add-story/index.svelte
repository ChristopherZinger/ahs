<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SurveyForm from '$src/components/homepage/survey/SurveyForm.svelte';
	import { AppError } from '$src/errors';
	import { addSurvey } from '$src/firebase/survey/addSurvey';
	import type { SurveyInput } from '$src/firebase/survey/shema';
	import { userStore } from '$src/stores/userStore';

	const currentPath = $page.url.pathname;

	const user = $userStore;

	async function onSubmit(data: SurveyInput) {
		if ($userStore) {
			const result = await addSurvey(data, $userStore.uid);

			if (result instanceof AppError) {
				return;
			}

			goto(`${currentPath}/thanks`);
		}
	}
</script>

<SurveyForm {onSubmit} />
