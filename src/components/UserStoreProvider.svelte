<script lang="ts">
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { userStore } from '$src/stores/userStore';

	const auth = getAuth();

	if (auth.currentUser) {
		userStore.login(auth.currentUser);
	} else {
		userStore.logout();
	}
</script>

<slot />
