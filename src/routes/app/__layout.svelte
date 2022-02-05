<script lang="ts">
	import { goto } from '$app/navigation';
	import { userStore } from '$src/stores/userStore';

	// this guards entire app from unauthorized users
	if (!$userStore) {
		goto('/');
	}
</script>

{#if $userStore}
	<slot />
{/if}
