import { app } from './../firebase/appFirebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

function createUserStore() {
	const { subscribe, set, update } = writable<undefined | User>(undefined);

	return {
		subscribe,
		login: (user: User) => update(() => user),
		logout: () => set(undefined)
	};
}

const userStore = createUserStore();

const auth = app.getAuth();

onAuthStateChanged(auth, (_user) => {
	console.log('user state changed', _user?.email);
	if (_user) {
		userStore.login(_user);
	} else {
		userStore.logout();
	}
});

export { userStore };
