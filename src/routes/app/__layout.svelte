<script lang="ts">
	import { goto } from '$app/navigation';
	import { userStore } from '$src/stores/userStore';
	import { page } from '$app/stores';

	const {
		url: { pathname }
	} = $page;

	// this guards entire app from unauthorized users
	if (!$userStore) {
		goto('/');
	}
</script>

{#if $userStore}
	<div class="grow lg:pb-4 lg:pr-4 lg:pl-4">
		<div id="app" class="h-full px-4 lg:px-28">
			<ul id="app-nav" class="flex space-x-10 py-10 lg:mb-20">

				<li><a href="/app/search">search</a></li>
				<li><a href="/app/add-story">add story</a></li>
				<li><a href="/app/add-office">add office</a></li>
				<li><a href="/app/profile">your profile</a></li>
			</ul>
			<div class="max-w-5xl mx-auto">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style>
	#app {
		background-color: var(--color-gray-light);
	}

	#app-nav {
		list-style: none;
		font-weight: bold;
		font-size: 1.1rem;
	}
</style>
