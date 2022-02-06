<script lang="ts">
	import { goto } from '$app/navigation';

	import { PATHS } from '$src/firebase/paths';
	import Link from '../buttons/Link.svelte';
	import PasswordResetEmailForm from './PasswordResetEmailForm.svelte';

	function onSubmit(): void {
		goto(PATHS.app.index);
	}
</script>

<div class="password-reset-email-box light-shadow">
	<div class="password-reset-email-wrapper">
		<PasswordResetEmailForm {onSubmit} />
	</div>
	<div class="links">
		<span>
			go back to
			<Link href={PATHS.auth.login} size="s">login</Link>
		</span>
	</div>
</div>

<style>
	.password-reset-email-wrapper {
		margin: 0 0 15px 0;
	}

	.links {
		display: flex;
		flex-direction: column;
		row-gap: 30px;
		align-items: center;
	}

	@media only screen and (min-width: 786px) {
		.password-reset-email-box {
			padding: 30px 48px;
			box-shadow: var(--shadow-light);
		}

		.password-reset-email-wrapper {
			margin: 50px 0px 15px 0;
		}

		.links {
			row-gap: 70px;
		}
	}
</style>
