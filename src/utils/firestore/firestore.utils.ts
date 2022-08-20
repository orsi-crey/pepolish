import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { collection } from 'firebase/firestore';

import { db } from '../firebase/firebase.utils';

export const getProductListQuery = () => {
  const ref = collection(db, 'products');

  const query = useFirestoreQueryData(['products'], ref);

  return query;
};
