import { app } from './../appFirebase';
import { AppError } from './../../errors';
import type { SurveyInput, Survey_FsDoc } from './shema';
import { addDoc, collection } from 'firebase/firestore';
import type { DocumentReference } from 'firebase/firestore';
import { Collections } from '$src/constants';

export const addSurvey = async (
	_data: SurveyInput,
	user: string
): Promise<DocumentReference | AppError> => {
	const firestore = app.getFirestore();

	const data: Survey_FsDoc = {
		..._data,
		reviewedAt: null,
		createdBy: user,
		createdAt: new Date().getTime()
	};

	try {
		return await addDoc(collection(firestore, Collections.SURVEY), data);
	} catch (err) {
		console.error('AppError: ', err);
		return new AppError();
	}
};
