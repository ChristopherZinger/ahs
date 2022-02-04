import { app } from './../appFirebase';
import { AppError } from './../../errors';
import type { SurveyInput } from './shema';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import type { DocumentReference } from 'firebase/firestore';
import { Collections } from '$src/constants';

export const addSurvey = async (_data: SurveyInput): Promise<DocumentReference | AppError> => {
	const firestore = app.getFirestore();

	const data = {
		..._data,
		isReviewed: false,
		createdAt: serverTimestamp()
	};

	try {
		return await addDoc(collection(firestore, Collections.SURVEY), data);
	} catch (err) {
		console.error('AppError: ', err);
		return new AppError();
	}
};
