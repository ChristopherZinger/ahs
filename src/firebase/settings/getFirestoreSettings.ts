import { AppError } from './../../errors';
import { app } from './../appFirebase';
import { getSettingsCollection } from './../collections';
import { getDoc, doc } from 'firebase/firestore';
import type { FS_Settings } from '../FS_types';

enum SettingsDocs {
	GENERAL = 'general'
}

export const getRemoteSettings = async (): Promise<FS_Settings | AppError> => {
	const f = app.getFirestore();
	try {
		return (await getDoc(doc(getSettingsCollection(f), SettingsDocs.GENERAL))).data();
	} catch (error) {
		return new AppError({ error });
	}
};
