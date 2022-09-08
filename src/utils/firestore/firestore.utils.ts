import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import {
  collection,
  doc,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../firebase/firebase.utils';

export const getListQuery = (collName: string) => {
  const ref = collection(db, collName);

  const query = useFirestoreQuery([collName], ref, {
    subscribe: true,
  });

  return query;
};

export const getItemQuery = (productId: string | undefined, collName: string, isQueryEnabled = true) => {
  const collectionRef = collection(db, collName);
  const ref = doc(collectionRef, productId);
  const query = useFirestoreDocumentData([collName, productId], ref, {}, { enabled: isQueryEnabled });

  return query;
};

export const getItemsByWhereQuery = (id: string | undefined, field: string, collName: string) => {
  const ref = query(
    collection(db, collName),
    where(field, '==', id)
  );

  const whereQuery = useFirestoreQuery([id], ref);

  return whereQuery;

};

export const addNewItem = (collName: string) => {
  const ref = collection(db, collName);
  const mutation = useFirestoreCollectionMutation(ref);

  return mutation;
};

export const updateItem = (id: string | undefined, collName: string) => {
  const coll = collection(db, collName);
  const ref = doc(coll, id);
  const mutation = useFirestoreDocumentMutation(ref);

  return mutation;
};
