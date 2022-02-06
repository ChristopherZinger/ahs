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
		const result = (await getDoc(doc(getSettingsCollection(f), SettingsDocs.GENERAL))).data();
		if (!result) {
			throw new AppError({ code: 'app_settings_could_not_be_retrieved' });
		}
		return result;
	} catch (error) {
		return new AppError({ error });
	}
};
