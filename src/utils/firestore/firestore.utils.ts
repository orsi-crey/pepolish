import {
  useFirestoreCollectionMutation,
  useFirestoreDocument,
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
  useFirestoreQueryData,
} from '@react-query-firebase/firestore';
import {
  collection,
  query,
  limit,
  where,
  doc,
  DocumentData,
} from 'firebase/firestore';
import { Polish } from '../../store/product/product.types';

import { db } from '../firebase/firebase.utils';

export const getProductListQuery = () => {
  const ref = collection(db, 'products');

  const query = useFirestoreQuery(['products'], ref, {
    subscribe: true,
  });

  return query;
};

export const getProductQuery = (productId: string | undefined) => {
  // const collectionRef = collection(db, 'products');
  // const ref = doc(collectionRef, productId);
  // const product = useFirestoreDocumentData(['products', productId], ref);

  // return product;
  const ref = query(
    collection(db, 'products'),
    limit(1),
    where('id', '==', productId)
  );

  const singleQuery = useFirestoreQueryData([productId], ref);
    console.log("singleQuery", singleQuery)
  return singleQuery;
};

export const addNewProduct = () => {
  const ref = collection(db, 'products');
  const mutation = useFirestoreCollectionMutation(ref);

  return mutation;
};

export const updateProduct = (product: Polish | DocumentData, id?: string) => {
  const coll = collection(db, 'products');
  const ref = doc(coll, id ? id : product.id);
  const mutation = useFirestoreDocumentMutation(ref);

  return mutation;
};
