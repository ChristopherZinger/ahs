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

export const userStore = createUserStore();
