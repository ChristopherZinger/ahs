<script lang="ts">
	import { authEmailAndPassword } from '$src/firebase/auth/emailAndPassword';

	import { userStore } from '$src/stores/userStore';

	function verifyEmail() {
		if ($userStore) {
			authEmailAndPassword.setEmailVerification($userStore);
		}
	}
</script>

<div class="grow lg:pb-4 lg:pr-4 lg:pl-4">
	<div id="app" class="h-full">
		<div id="app-nav-container">
			<ul id="app-nav">
				<li>search</li>
				<li>add story</li>
				<li>add office</li>
				<li>your profile</li>
			</ul>
		</div>
		<div id="app-content">
			{#if $userStore}
				<p>
					{$userStore.email}
				</p>
				<p>has verified email: {$userStore.emailVerified}</p>
				<button on:click={verifyEmail}>verify your email</button>
			{/if}
		</div>
	</div>
</div>

<style>
	#app {
		background-color: var(--color-gray-light);
	}

	#app-content {
		max-width: 1200px;
		margin: auto;
	}

	#app-nav-container {
		padding: 77px 120px;
	}
	#app-nav {
		display: flex;
		list-style: none;
		column-gap: 50px;
		padding: 0;
		margin: 0;
		font-weight: bold;
		font-size: 20px;
	}
</style>
