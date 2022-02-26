<script lang="ts">
	import Checkbox from '$src/components/form/Checkbox.svelte';
	import {
		RedFlagsCategories,
		RedFlagsDisplayNames,
		RedFlagsValues
	} from '$src/firebase/survey/shema';
	// import { surveyModeStore } from '$src/stores/surveyModeStore';

	export let redFlags: RedFlagsValues;

	const getCategory = (category: string): [string, string][] => {
		if (category in RedFlagsDisplayNames) {
			return Object.entries(RedFlagsDisplayNames[category as RedFlagsCategories]);
		}
		return [];
	};
</script>

<div class="survey-red-flags">
	<h4 class="mb-10">Red Flags</h4>
	<!-- <p class="max-w-2xl">
		Sign up all the bullshit that is going on in {$surveyModeStore.office.name || '___'}
	</p> -->
	{#each Object.keys(RedFlagsDisplayNames) as category, i}
		{#if category in RedFlagsDisplayNames}
			<div class="survey-red-flags__category">
				<h6 class="survey-red-flags__category-title">{i + 1}. {category}:</h6>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-8 gap-y-5">
					{#each getCategory(category) as [key, text]}
						<Checkbox {text} checked={redFlags[category][key]} {key} />
					{/each}
				</div>
			</div>
		{/if}
	{/each}
</div>

<style>
	.survey-red-flags__category-title {
		margin-top: var(--spacing-xxl);
		margin-bottom: var(--spacing-l);
	}
</style>
