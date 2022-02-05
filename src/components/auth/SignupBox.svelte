<script lang="ts">
	import { goto } from '$app/navigation';

	import { PATHS } from '$src/firebase/paths';
	import Link from '../buttons/Link.svelte';
	import Heading from '../text/Heading.svelte';
	import SignupStep1Form from './SignupStep1Form.svelte';

	function onSubmit(): void {
		goto('/');
	}
</script>

<div class="signup-box light-shadow">
	<header>
		<Heading h={2} size={4}>Details</Heading>
	</header>
	<div class="signup-form-wrapper">
		<SignupStep1Form {onSubmit} />
	</div>
	<div class="links">
		<span>
			Do you have an account?
			<Link href={PATHS.auth.login} size="s">login</Link>
		</span>
	</div>
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
