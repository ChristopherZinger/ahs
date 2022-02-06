<script lang="ts">
	import { surveyModeStore } from '$src/stores/surveyModeStore';
	import SurveyForm from './SurveyForm.svelte';

	$: officeName = $surveyModeStore.office.name;
</script>

<!-- section id is is used as href reference. dont' change it. -->
<section id="survey" class="survey with-border">
	<div class="survey__title">
		<h1 class="h2">
			Your Story {#if officeName} in {officeName} {/if}
		</h1>
		<p style="max-width: 600px; margin: auto; margin-bottom: 50px;">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus tempora ex veniam esse id
			dolor nemo distinctio quo numquam omnis incidunt voluptatum, illo quam perspiciatis? Quo
			repellendus quod consequatur repudiandae.
		</p>
	</div>
	<div class="survey__form-wrapper">
		<SurveyForm />
	</div>
</section>

<style>
	.survey {
		padding: var(--spacing-l);
		border-color: var(--color-white);
		background-color: var(--color-gray-light);
	}

	h1 {
		text-align: center;
	}

	.survey__form-wrapper {
		max-width: 1000px;
		margin: auto;
	}
</style>
