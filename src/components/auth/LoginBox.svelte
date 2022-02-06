<script lang="ts">
	import { goto } from '$app/navigation';
	import { PATHS } from '$src/firebase/paths';
	import Link from '../buttons/Link.svelte';
	import Heading from '../text/Heading.svelte';
	import LoginForm from './LoginForm.svelte';

	function onSubmit(): void {
		goto(PATHS.app.index);
	}
</script>

<div class="login-box light-shadow">
	<header>
		<Heading h={2} size={4}>Details</Heading>
	</header>
	<div class="login-form-wrapper">
		<LoginForm {onSubmit} />
	</div>
	<div class="links">
		<Link href={PATHS.auth.passwordResetEmail} size="xs" style="color:var(--color-gray);"
			>forgot password</Link
		>
		<span>
			Don't have accout yet?
			<Link href={PATHS.auth.signup} size="s">signup</Link>
		</span>
	</div>
</div>

<style>
	.login-form-wrapper {
		margin: 0 0 15px 0;
	}

	.links {
		display: flex;
		flex-direction: column;
		row-gap: 30px;
		align-items: center;
	}

	header {
		display: none;
	}

	@media only screen and (min-width: 786px) {
		.login-box {
			padding: 30px 48px;
			box-shadow: var(--shadow-light);
		}

		header {
			display: block;
		}

		.login-form-wrapper {
			margin: 50px 0px 15px 0;
		}

		.links {
			row-gap: 70px;
		}
	}
</style>
