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

export const getListQuery = (coll: string) => {
  const ref = collection(db, coll);

  const query = useFirestoreQuery([coll], ref, {
    subscribe: true,
  });

  return query;
};

export const getProductQuery = (productId: string | undefined) => {
  const collectionRef = collection(db, 'products');
  const ref = doc(collectionRef, productId);
  const query = useFirestoreDocumentData(['products', productId], ref);

  return query;
};

export const addNewProduct = () => {
  const ref = collection(db, 'products');
  const mutation = useFirestoreCollectionMutation(ref);

  return mutation;
};

export const updateProduct = (id: string | undefined) => {
  const coll = collection(db, 'products');
  const ref = doc(coll, id);
  const mutation = useFirestoreDocumentMutation(ref);

  return mutation;
};
