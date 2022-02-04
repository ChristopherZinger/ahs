import { countries } from '$src/helpers/countries';
import * as yup from 'yup';

export const surveyFormSchema = yup.object().shape({
	office: yup
		.string()
		.min(3, 'Office Name has to be longer than 2 characters.')
		.required('Office name is a required field.'),
	city: yup
		.string()
		.min(3, 'City name has to be longer than 2 characters.')
		.required('City is a required field.'),
	country: yup
		.string()
		.required('Country is a required field.')
		.test(
			'is-valid-country-code',
			'Country name in invalid.',
			(v) => !!countries.find((c) => c.code === v)
		),
	story: yup
		.string()
		.required('Story is a required field.')
		.min(10, 'Story is too short. Write at least 10 characters.')
		.max(2500, 'Story is too long. Write max 2500 characters')
});
