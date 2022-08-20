import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, getDocs, collection, QueryDocumentSnapshot } from 'firebase/firestore';

import { Polish } from '../../store/product/product.types';

const firebaseConfig = {
  apiKey: 'AIzaSyB7sKt1z5cSOFJXLCPvG3QAyc4i2R4hEdY',
  authDomain: 'pepolish-7835b.firebaseapp.com',
  projectId: 'pepolish-7835b',
  storageBucket: 'pepolish-7835b.appspot.com',
  messagingSenderId: '711279894772',
  appId: '1:711279894772:web:87893a6cdde75f7c613ea1',
  measurementId: 'G-ZB8KFHLLMR',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth: User, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      alert('error creating user');
      console.log('error creating user: ', error);
    }
  }

  return userDocRef;
};

export const getUserDocFromAuth = async (userAuth: User | null) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  return userSnapshot.data();
};

const uploadDocFromAuth = async (userAuth: User | null, data: any) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  try {
    await updateDoc(userDocRef, {
      ...data,
    });
  } catch (error) {
    alert('error uploading data');
    console.log('error uploading data: ', error);
  }
};

export const getProductListDoc = async () => {
  const productsSnapshot = await getDocs(collection(db, 'products'));
  const products: Polish[] = [];
  productsSnapshot.forEach((product: QueryDocumentSnapshot) => products.push({ id: product.id, ...product.data() } as Polish));
  return products;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback: any) => onAuthStateChanged(auth, callback);

export const signOutUser = async () => signOut(auth);

export const getAllUserData = async () => getUserDocFromAuth(auth.currentUser);

export const uploadDataToUser = async (data: any) => uploadDocFromAuth(auth.currentUser, data);

export const getProductList = async () => getProductListDoc();
