import type { OfficeStoryInput } from './../firebase/office/shema';
import type { RedFlagsValues, SurveyInput } from './../firebase/survey/shema';

export const constructSurveyInputFromOfficeInputAndRedFlags = (
	officeData: OfficeStoryInput,
	flagsData: string[]
): SurveyInput => {
	return {
		...officeData,
		redFlags: flagsData
	};
};

export const redFlagsToArray = (redFlags: RedFlagsValues): string[] => {
	return Object.entries(redFlags).reduce((acc, [, categoryValues]) => {
		return [
			...acc,
			...Object.entries(categoryValues).reduce((acc, [flagKey, flagValue]) => {
				return flagValue ? [...acc, flagKey] : [...acc];
			}, [])
		];
	}, []);
};
