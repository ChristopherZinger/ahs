import { app } from './../appFirebase';
import { FS_ReadError } from './../../errors';
import { getSettingsCollection } from './../collections';
import { getDoc, doc } from 'firebase/firestore';
import type { FS_Settings } from '../FS_types';

enum SettingsDocs {
	GENERAL = 'general'
}

export const getRemoteSettings = async (): Promise<FS_Settings | FS_ReadError> => {
	const f = app.getFirestore();
	try {
		return (await getDoc(doc(getSettingsCollection(f), SettingsDocs.GENERAL))).data();
	} catch (err) {
		return new FS_ReadError('Could not read settings.general document', err);
	}
};
