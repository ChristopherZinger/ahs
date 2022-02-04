<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { FS_ReadError } from '$src/errors';
	import { getRemoteSettings } from '$src/firebase/settings/getFirestoreSettings';
	import { onMount } from 'svelte';

	export let isModeSurvey = false;

	const { url } = $page;
	console.log(url.pathname, $page);
	const pathBase = url.pathname.split('/').find((f) => !!f);

	$: settings = undefined;

	onMount(async () => {
		const result = await getRemoteSettings();
		if (!(result instanceof FS_ReadError) && result.isModeSurvey) {
			isModeSurvey = true;
			goto('/survey');
		}
		settings = result;
	});
</script>

{#if settings && !(settings instanceof FS_ReadError) && settings.isModeSurvey && pathBase === 'survey'}
	<slot />
{/if}

{#if settings && !(settings instanceof FS_ReadError) && !settings.isModeSurvey && pathBase !== 'survey'}
	<slot />
{/if}

{#if settings && !(settings instanceof FS_ReadError) && !settings.isModeSurvey && pathBase === 'survey'}
	<slot />
{/if}
