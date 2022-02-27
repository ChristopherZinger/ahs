<script lang="ts">
	import Checkbox from '$src/components/form/Checkbox.svelte';
	import { RedFlagsDisplayNames, RedFlagsValues } from '$src/firebase/survey/shema';

	export let redFlags: RedFlagsValues;
</script>

<div class="survey-red-flags">
	<h4 class="mb-10">Red Flags</h4>
	{#each Object.entries(RedFlagsDisplayNames) as [category, flags], i}
		{#if category in RedFlagsDisplayNames}
			<div>
				<h6 class="mb-8 mt-16">{i + 1}. {category}:</h6>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-8 gap-y-5">
					{#each Object.entries(flags) as [key, text]}
						<Checkbox {text} checked={redFlags[category][key]} {key} />
					{/each}
				</div>
			</div>
		{/if}
	{/each}
</div>
