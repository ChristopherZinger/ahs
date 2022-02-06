import { Collections } from '$src/constants';
import {
	collection,
	CollectionReference,
	Firestore,
	QueryDocumentSnapshot
} from 'firebase/firestore';
import type { FS_Settings } from './FS_types';

export const converter = <T>(): {
	toFirestore: (data: T) => T;
	fromFirestore: (snap: QueryDocumentSnapshot) => T;
} => ({
	toFirestore: (data: T) => data,
	fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T
});

export const getSettingsCollection = (firestore: Firestore): CollectionReference<FS_Settings> =>
	collection(firestore, Collections.SETTINGS).withConverter(converter<FS_Settings>());
