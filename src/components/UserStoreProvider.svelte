<script context="module">
	export const userContextKey = {};
</script>

<script lang="ts">
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { userStore } from '$src/stores/userStore';

	const auth = getAuth();

	onAuthStateChanged(auth, (_user) => {
		if (_user) {
			userStore.login(_user);
		} else {
			userStore.logout();
		}
	});
</script>

<slot />
