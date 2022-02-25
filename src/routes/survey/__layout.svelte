<script lang="ts">
	import { goto } from '$app/navigation';
	import { AppError } from '$src/errors';
	import type { FS_Settings } from '$src/firebase/FS_types';
	import { PATHS } from '$src/firebase/paths';
	import { getRemoteSettings } from '$src/firebase/settings/getFirestoreSettings';
	import { onMount } from 'svelte';

	let settings: FS_Settings;

	function redirectToHomeIfNotSurveyMode(settings: FS_Settings) {
		if (!settings?.isModeSurvey) {
			goto(PATHS.home.index);
		}
	}

	onMount(async () => {
		const result = await getRemoteSettings();
		if (!(result instanceof AppError)) {
			redirectToHomeIfNotSurveyMode(result);
			settings = result;
		}
	});
</script>

{#if settings && settings.isModeSurvey}
	<slot />
{:else}
	is loading settings
{/if}
