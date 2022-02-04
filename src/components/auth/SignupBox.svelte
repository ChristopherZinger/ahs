<script lang="ts">
	import { PATHS } from '$src/firebase/paths';
	import Link from '../buttons/Link.svelte';
	import Heading from '../text/Heading.svelte';
	import SignupStep1Form from './SignupStep1Form.svelte';
	import SignupStep2Form from './SignupStep2Form.svelte';

	let step: 1 | 2 = 1;

	function setStep(s: 1 | 2): void {
		step = s;
	}

	$: {
		step;
	}
</script>

<div class="signup-box light-shadow">
	{#if step === 1}
		<header>
			<Heading h={2} size={4}>Details</Heading>
		</header>
		<div class="signup-form-wrapper">
			<SignupStep1Form onSubmit={() => setStep(2)} />
		</div>
		<div class="links">
			<span>
				Do you have an account?
				<Link href={PATHS.auth.login} size="s">login</Link>
			</span>
		</div>
	{:else if step === 2}
		<header>
			<Heading h={2} size={4}>Account created!</Heading>
		</header>
		<SignupStep2Form onSubmit={() => {}} />
	{/if}
</div>

<style>
	.signup-form-wrapper {
		margin: 0 0 15px 0;
	}

	.links {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20px;
	}

	header {
		display: none;
	}

	@media only screen and (min-width: 786px) {
		.signup-box {
			padding: 30px 48px;
			box-shadow: var(--shadow-light);
		}

		header {
			display: block;
		}

		.signup-form-wrapper {
			margin: 50px 0px 15px 0;
		}

		.links {
			margin-top: 40px;
		}
	}
</style>
