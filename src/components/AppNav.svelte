<script lang="ts">
	import { goto } from '$app/navigation';

	import { authEmailAndPassword } from '$src/firebase/auth/emailAndPassword';
	import { PATHS } from '$src/firebase/paths';
	import { userStore } from '$src/stores/userStore';
</script>

<nav class="app-container">
	<div class="nav-inner">
		<div class="nav-left">
			<div class="logo">
				<a href={PATHS.home.index}>
					ARCHITECTURE<br />HORROR<br />STORY
				</a>
			</div>
		</div>
		<div class="nav-center" />
		<div class="nav-right">
			{#if $userStore}
				<span
					on:click={async () => {
						await authEmailAndPassword.logout();
						goto(PATHS.home.index);
					}}>logout</span
				>
			{:else}
				<a href={PATHS.auth.signup}>signup</a>
				<a href={PATHS.auth.login}>login</a>
			{/if}
		</div>
		<div class="toggle-btn">menu</div>
	</div>
</nav>

<style>
	nav {
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-inner {
		display: flex;
		justify-content: space-between;
		flex: 1;
	}

	.logo a,
	.logo a:visited,
	.logo a:active {
		font-family: 'Poppins Black';
		font-size: 16px;
		line-height: 0.6;
		text-decoration: none;
		color: var(--color-black);
	}

	.nav-right {
		display: none;
	}

	.nav-right a,
	.nav-right span {
		font-family: 'Poppins Bold';
		color: var(--color-black);
		text-decoration: none;
		cursor: pointer;
	}

	@media only screen and (min-width: 786px) {
		nav {
			height: 200px;
		}

		.nav-inner {
			margin: 0 90px;
		}

		.logo a,
		.logo a:visited,
		.logo a:active {
			font-size: 22px;
			line-height: 0.9;
		}

		.nav-right {
			display: flex;
			column-gap: 100px;
			align-items: center;
		}

		.toggle-btn {
			display: none;
		}
	}
</style>
