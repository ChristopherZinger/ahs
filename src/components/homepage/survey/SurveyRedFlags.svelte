<script lang="ts">
	import {
		RedFlagsCategories,
		RedFlagsDisplayNames,
		RedFlagsValues
	} from '$src/firebase/survey/shema';
	import { surveyModeStore } from '$src/stores/surveyModeStore';

	export let redFlags: RedFlagsValues;

	const getCategory = (category: string): [string, string][] => {
		if (category in RedFlagsDisplayNames) {
			return Object.entries(RedFlagsDisplayNames[category as RedFlagsCategories]);
		}
		return [];
	};
</script>

<div class="survey-red-flags">
	<h5 style="margin-bottom: 0.5em">Red Flags</h5>
	<p style="max-width: 600px">
		Sign up all the bullshit that is going on in {$surveyModeStore.office.name || '___'}
	</p>
	{#each Object.keys(RedFlagsDisplayNames) as category, i}
		{#if category in RedFlagsDisplayNames}
			<div class="survey-red-flags__category">
				<h6 class="survey-red-flags__category-title">{i + 1}. {category}:</h6>
				<div class="survey-red-flags__checkboxes">
					{#each getCategory(category) as [key, text]}
						<div class="survey-red-flags__checkbox">
							<label for="red-flag--{key}" class:checked={redFlags[category][key]}>{text}</label>
							<input
								type="checkbox"
								id="red-flag--{key}"
								name="name"
								bind:checked={redFlags[category][key]}
								hidden
							/>
						</div>
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
	.survey-red-flags__checkboxes {
		display: flex;
		flex-wrap: wrap;
		column-gap: var(--spacing);
		row-gap: var(--spacing-xl);
	}

	.survey-red-flags__checkbox {
		width: 100%;
		box-sizing: border-box;
		position: relative;
	}

	label {
		cursor: pointer;
		margin-left: 50px;
	}

	label::before {
		content: '';
		left: 0;
		position: absolute;
		display: inline-block;
		width: 35px;
		height: 19px;
		border: 1px solid var(--color-gray);
		background-color: var(--color-white);
		border-radius: 10px;
		margin-right: 10px;
		transition-duration: 0.3s;
	}

	label::after {
		content: '';
		position: absolute;
		top: 3px;
		left: 3px;
		display: inline-block;
		width: 15px;
		height: 15px;
		background-color: var(--color-gray-dark);
		border-radius: 50%;
		transition-duration: 0.3s;
	}

	label.checked::before {
		background-color: var(--color-orange);
		border-color: var(--color-orange);
	}

	label.checked::after {
		left: 18px;
		background-color: var(--color-white);
	}

	label.checked {
		text-decoration: underline;
	}

	@media only screen and (min-width: 786px) {
		.survey-red-flags__checkbox {
			width: calc((100% - (2 * var(--spacing-l))) / 3);
		}
	}
</style>
