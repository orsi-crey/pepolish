import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { collection, query, limit, where } from 'firebase/firestore';

import { db } from '../firebase/firebase.utils';

export const getProductListQuery = () => {
  const ref = collection(db, 'products');

  const query = useFirestoreQueryData(['products'], ref);

  return query;
};

export const getProductQuery = (productId: string | undefined) => {
  // kérdés: ez most igazából minden single page nyitásnál újra fetchel? meg kéne nézni hogy nincs e már local
  // vagy ezt csinálja is vajon a usequery?
  const ref = query(
    collection(db, 'products'),
    limit(1),
    where('id', '==', productId)
  );

  const singleQuery = useFirestoreQueryData([productId], ref);

  return singleQuery;
};
