<script lang="ts">
	import { page } from '$app/stores';
	import Link from '$src/components/buttons/Link.svelte';
	import SubmitBtn from '$src/components/buttons/SubmitBtn.svelte';
	import SvgArror from '$src/components/svg/SVGArror.svelte';
	import { userSurveyRelation } from '$src/firebase/settings/userSurveyRelation/userSurveyRelation';

	const { query } = $page;
	const surveyId = query.get('id');

	let email = '';
	$: isLoading = false;
	$: isEmpty = email === '';
	$: success = false;
	$: error = false;

	const handleSubmit = async () => {
		const data = {
			userEmail: email,
			surveyId: surveyId
		};

		isLoading = true;
		try {
			await userSurveyRelation.add(data);
			success = true;
		} catch (err) {
			error = true;
			console.error(err);
		}
		isLoading = false;
	};
</script>

<main class="with-border">
	<div class="thanks">
		{#if !error}
			<h2>thanks!</h2>
		{:else}
			<h2>Oops!</h2>
		{/if}

		{#if !success && !error}
			<p>
				Your input is what will make this webpage possible. We hope to create a community of
				proffesionnals like you.
			</p>

			<p>When the webpage is ready we will hit you up on the email you provide:</p>
			<form on:submit|preventDefault={handleSubmit}>
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="eg. john.doe@hotmail.com"
					bind:value={email}
				/>

				<div class="actions">
					<div>
						<SubmitBtn isDisabled={isLoading || isEmpty}>Submit</SubmitBtn>
					</div>
					<div class="go-home">
						<Link href="/survey" size="m">home <span slot="icon"><SvgArror /></span></Link>
					</div>
				</div>
			</form>
		{/if}

		{#if success}
			<p>
				We will reach you in the future on <span style="text-decoration: underline">{email}</span>
			</p>
			<Link href="/survey" size="m">home <span slot="icon"><SvgArror /></span></Link>
		{/if}

		{#if error}
			<p>Something went wrong.</p>
			<p>
				We got your survey but there was a error wile saving your email. Pleas keep an eye on
				architecture-horror-stories.com . We will be up soon!
			</p>
			<Link href="/survey" size="m">home <span slot="icon"><SvgArror /></span></Link>
		{/if}
	</div>
</main>

<style>
	main {
		min-height: 100%;
		background-color: var(--color-gray-light);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	@media only screen and (min-width: 786px) {
		main {
			height: 100%;
		}
	}

	p {
		font-size: 22px;
	}

	form {
		max-width: 500px;
	}

	label {
		display: block;
		margin-bottom: var(--spacing-l);
	}

	.go-home {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--spacing-m) 0;
	}

	.actions {
		margin-top: var(--spacing-l);
		display: flex;
		flex-direction: column;
		row-gap: var(--spacing-l);
	}

	@media only screen and (min-width: 786px) {
		.actions {
			flex-direction: row;
		}
	}

	.actions > * {
		flex-grow: 1;
	}

	.thanks {
		max-width: 1000px;
		padding: var(--spacing);
		margin: auto;
	}
</style>
