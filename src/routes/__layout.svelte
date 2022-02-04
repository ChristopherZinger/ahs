<script lang="ts">
	import AppNav from '$src/components/AppNav.svelte';
	import Oops from '$src/components/Oops.svelte';
	import RedirectIfSurvey from '$src/components/RedirectIfSurvey.svelte';
	import UserStoreProvider from '$src/components/UserStoreProvider.svelte';
	import { FS_ReadError } from '$src/errors';
	import { getRemoteSettings } from '$src/firebase/settings/getFirestoreSettings';

	let isModeSurvey: boolean | undefined = undefined;
	let err: undefined | FS_ReadError | Error = undefined;
	let isLoading = true;

	getRemoteSettings()
		.then((result) => {
			if (result instanceof FS_ReadError) {
				err = result;
				isLoading = false;
				return;
			}
			isModeSurvey = result.isModeSurvey;
			isLoading = false;
		})
		.catch((error) => {
			err = error;
		});

	$: {
		isModeSurvey, isLoading, err;
	}
</script>

{#if isLoading}
	App is loading
{:else if err}
	<Oops />
{:else}
	<RedirectIfSurvey>
		<UserStoreProvider>
			{#if isModeSurvey !== undefined && isModeSurvey === false}
				<AppNav />
			{/if}
			<div class="layout">
				<slot />
			</div>
		</UserStoreProvider>
	</RedirectIfSurvey>
{/if}

<style>
	.layout {
		height: 100%;
		max-height: 100%;
	}
</style>
