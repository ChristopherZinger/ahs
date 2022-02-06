import { writable } from 'svelte/store';

const initialSurveyModeStore = {
	office: {
		name: ''
	}
};

export const surveyModeStore = writable(initialSurveyModeStore);

export const setOfficeName = (name: string): void => {
	surveyModeStore.update((u) => ({
		...u,
		office: {
			...u.office,
			name
		}
	}));
};
