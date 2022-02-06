import { AppError } from './../../../errors';
import { converter } from './../../collections';
import { app } from './../../appFirebase';
import type { CollectionReference } from 'firebase/firestore';
import { collection, addDoc, getDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Collections } from '$src/constants';

export abstract class AbstractDocument<InputData, Fs_Doc extends InputData> {
	constructor(protected collection: CollectionReference<Fs_Doc>) {}
	public abstract add(data: InputData): Promise<string | AppError>;
	public abstract getById(id: string): Promise<Fs_Doc | AppError>;
}

interface UserSurveyRelationInputData {
	userEmail: string;
	surveyId: string;
}

interface UserSurveyRelation_FsDoc extends UserSurveyRelationInputData {
	createdAt: Date;
}

class UserSurveyRelation extends AbstractDocument<
	UserSurveyRelationInputData,
	UserSurveyRelation_FsDoc
> {
	constructor(collection: CollectionReference<UserSurveyRelation_FsDoc>) {
		super(collection);
	}

	public async add(data: UserSurveyRelationInputData): Promise<string | AppError> {
		const dataWithStamps = {
			...data,
			createdAt: serverTimestamp()
		};

		try {
			return (await addDoc(this.collection, dataWithStamps)).id;
		} catch (err) {
			return new AppError('Doc Creation Error: UserSurveyRelation', err);
		}
	}

	public async getById(id: string): Promise<UserSurveyRelation_FsDoc | AppError> {
		try {
			return (await getDoc(doc(this.collection, id))).data();
		} catch (error) {
			return new AppError('Error while getting UserSurveyRelation by id.', error);
		}
	}
}

const firestore = app.getFirestore();
const userSurveyRelationCollectionRef = collection(
	firestore,
	Collections.USER_SURVEY_RELATION
).withConverter(converter<UserSurveyRelation_FsDoc>());

export const userSurveyRelation = new UserSurveyRelation(userSurveyRelationCollectionRef);
