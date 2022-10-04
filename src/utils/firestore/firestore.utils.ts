import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import {
  collection,
  doc,
  DocumentData,
  documentId,
  DocumentReference,
  FirestoreError,
  query,
  where,
  WithFieldValue,
} from 'firebase/firestore';
import { UseMutationResult } from 'react-query';

import { auth, db } from '../firebase/firebase.utils';

type indexableData = {
  [key: string]: DocumentData;
};

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
        const list: indexableData = {};
        snapshot.docs.map((docSnapshot) => Object.defineProperty(list, docSnapshot.id, { value: docSnapshot.data() }));
        return list;
      },
    }
  );

  return query;
};

export const getItemQuery = (productId: string | undefined, collName: string, isQueryEnabled = true) => {
  // if (productId === '' || productId === null || productId === undefined) {
  //   return UseQueryResult;
  // }
  const collectionRef = collection(db, collName);
  const ref = doc(collectionRef, productId);
  const query = useFirestoreDocumentData([collName, productId], ref, {}, { enabled: isQueryEnabled });

  return query;
};

export const getItemsByWhereQuery = (id: string | undefined, field: string, collName: string, isQueryEnabled = true) => {
  const ref = query(collection(db, collName), where(field, '==', id));

  const whereQuery = useFirestoreQuery([id], ref, {}, { enabled: isQueryEnabled });

  return whereQuery;
};

export const getListSubsetQuery = (ids: string[] | undefined, collName: string, isQueryEnabled = true) => {
  const ref = query(collection(db, collName), where(documentId(), 'in', ids));

  const whereQuery = useFirestoreQuery([ids], ref, {}, { enabled: isQueryEnabled });

  return whereQuery;
};

export const getListFilteredFieldsQuery = (collName: string, field: string, isQueryEnabled = true) => {
  const ref = collection(db, collName);

  const query = useFirestoreQuery(
    [collName],
    ref,
    {
      subscribe: true,
    },
    {
      enabled: isQueryEnabled,
      select(snapshot) {
        return snapshot.docs.map((docSnapshot) => docSnapshot.data()[field]);
      },
    }
  );

  return query;
};

export const getItemsByWhereFilteredFieldsQuery = (id: string | undefined, field: string, collName: string, isQueryEnabled = true) => {
  const ref = query(collection(db, collName), where(field, '==', id));

  const whereQuery = useFirestoreQuery(
    [id],
    ref,
    {},
    {
      enabled: isQueryEnabled,
      select(snapshot) {
        return snapshot.docs.map((docSnapshot) => docSnapshot.data().name);
      },
    }
  );

  return whereQuery;
};

export const getProductIDWhereQuery = (brand: string, name: string, isQueryEnabled: boolean) => {
  const ref = query(collection(db, 'products'), where('brand', '==', brand), where('name', '==', name));

  const whereQuery = useFirestoreQuery([`${brand}${name}`], ref, {}, { enabled: isQueryEnabled });

  return whereQuery;
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
