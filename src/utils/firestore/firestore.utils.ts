import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  FirestoreError,
  WithFieldValue,
} from 'firebase/firestore';
import { UseMutationResult } from 'react-query';

import { db } from '../firebase/firebase.utils';

export const getListQuery = (collName: string) => {
  const ref = collection(db, collName);

  const query = useFirestoreQuery(
    [collName],
    ref,
    {
      subscribe: true,
    },
    {
      select(snapshot) {
        return new Map(snapshot.docs.map((docSnapshot) => [docSnapshot.id, docSnapshot.data()]));
      },
    }
  );

  return query;
};

export const addNewItem = (collName: string) => {
  const ref = collection(db, collName);
  const mutation = useFirestoreCollectionMutation(ref);

  return mutation;
};

export const updateItem = (id: string | undefined, collName: string) => {
  if (id === '' || id === null) {
    return;
  }
  const coll = collection(db, collName);
  const ref = doc(coll, id);
  const mutation = useFirestoreDocumentMutation(ref);

  return mutation;
};

export type mutationResult =
  | UseMutationResult<void, FirestoreError, WithFieldValue<DocumentData>, unknown>
  | UseMutationResult<DocumentReference<DocumentData>, FirestoreError, WithFieldValue<DocumentData>, unknown>;
