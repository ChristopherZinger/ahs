<script lang="ts">
	import { authEmailAndPassword } from '$src/firebase/auth/emailAndPassword';

	import { userStore } from '$src/stores/userStore';

	function verifyEmail() {
		if ($userStore) {
			authEmailAndPassword.setEmailVerification($userStore);
		}
	}
</script>

<h5>/app :</h5>
{#if $userStore}
	<p>
		{$userStore.email}
	</p>
	<p>has verified email: {$userStore.emailVerified}</p>
	<button on:click={verifyEmail}>verify your email</button>
{/if}
