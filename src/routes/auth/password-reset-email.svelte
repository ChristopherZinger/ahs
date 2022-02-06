<script lang="ts">
	import PasswordResetEmailBox from '$src/components/auth/PasswordResetEmailBox.svelte';
	import Heading from '$src/components/text/Heading.svelte';
</script>

<div class="app-container">
	<div class="login-view">
		<header>
			<Heading h={1}>Password Reset Email</Heading>
		</header>
		<PasswordResetEmailBox />
	</div>
</div>

<style>
	header {
		margin: 0 0 15px 0;
	}
	.login-view {
		max-width: 450px;
		margin: auto;
	}

	@media only screen and (min-width: 786px) {
		header {
			margin: 0 0 60px 0;
		}
	}
</style>
