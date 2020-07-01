import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBaorPl1dlzvbZAd-SNQHOxlzGThFWRYeM",
  authDomain: "pearl-land-db.firebaseapp.com",
  databaseURL: "https://pearl-land-db.firebaseio.com",
  projectId: "pearl-land-db",
  storageBucket: "pearl-land-db.appspot.com",
  messagingSenderId: "643210901011",
  appId: "1:643210901011:web:8cca7f58be74fd732331e6",
  measurementId: "G-9DEYBKCZL4",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
