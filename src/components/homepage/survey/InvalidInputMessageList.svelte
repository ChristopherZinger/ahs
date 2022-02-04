<script lang="ts">
	import InvalidInputLi from './InvalidInputLi.svelte';
	export let errorMessages: string[];
</script>

{#if errorMessages.length}
	<ul>
		{#each errorMessages as err}
			<InvalidInputLi message={err} />
		{/each}
	</ul>
{/if}

<style>
	ul {
		list-style: none;
		padding-left: 0px;
	}
</style>
