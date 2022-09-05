import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import {
  collection,
  doc,
} from 'firebase/firestore';

import { db } from '../firebase/firebase.utils';

export const getListQuery = (collName: string) => {
  const ref = collection(db, collName);

  const query = useFirestoreQuery([collName], ref, {
    subscribe: true,
  });

  return query;
};

export const getItemQuery = (productId: string | undefined, collName: string) => {
  const collectionRef = collection(db, collName);
  const ref = doc(collectionRef, productId);
  const query = useFirestoreDocumentData([collName, productId], ref);

  return query;
};

export const addNewProduct = () => {
  const ref = collection(db, 'products');
  const mutation = useFirestoreCollectionMutation(ref);

  return mutation;
};

export const updateItem = (id: string | undefined, collName: string) => {
  const coll = collection(db, collName);
  const ref = doc(coll, id);
  const mutation = useFirestoreDocumentMutation(ref);

  return mutation;
};
