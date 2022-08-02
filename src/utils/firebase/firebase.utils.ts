import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB7sKt1z5cSOFJXLCPvG3QAyc4i2R4hEdY",
  authDomain: "pepolish-7835b.firebaseapp.com",
  projectId: "pepolish-7835b",
  storageBucket: "pepolish-7835b.appspot.com",
  messagingSenderId: "711279894772",
  appId: "1:711279894772:web:87893a6cdde75f7c613ea1",
  measurementId: "G-ZB8KFHLLMR"
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
        ...additionalInfo
      });
    } catch (error) {
      alert("error creating user");
      console.log("error creating user: ", error);
    }
  }

  return userDocRef;
}

export const getUserDocFromAuth = async (userAuth: User) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  return userSnapshot.data();
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}