<script lang="ts">
	import { goto } from '$app/navigation';
	import { authEmailAndPassword } from '$src/firebase/auth/emailAndPassword';
	import { PATHS } from '$src/firebase/paths';
	import { userStore } from '$src/stores/userStore';

	$: homePath = $userStore ? PATHS.app.index : PATHS.home.index;
</script>

<nav class="px-4">
	<div class="flex justify-between my-10 lg:mx-28 ">
		<div class="nav-left">
			<div class="logo">
				<a href={homePath}>
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
