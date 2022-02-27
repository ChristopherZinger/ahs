<script lang="ts">
	import '../app.css';
	import AppNav from '$src/components/AppNav.svelte';
	import Oops from '$src/components/Oops.svelte';
	import RedirectIfSurvey from '$src/components/RedirectIfSurvey.svelte';
	import UserStoreProvider from '$src/components/UserStoreProvider.svelte';
	import { AppError } from '$src/errors';
	import { getRemoteSettings } from '$src/firebase/settings/getFirestoreSettings';

	let isModeSurvey: boolean | undefined = undefined;
	let err: undefined | AppError | Error = undefined;
	let isLoading = true;

	getRemoteSettings()
		.then((result) => {
			if (result instanceof AppError) {
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
			<div class="h-full flex flex-col">
				{#if isModeSurvey !== undefined && isModeSurvey === false}
					<AppNav />
				{/if}
				<slot />
			</div>
		</UserStoreProvider>
	</RedirectIfSurvey>
{/if}
