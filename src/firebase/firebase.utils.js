import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

const config = {
  apiKey: "AIzaSyAMYx_QRZZ5Iv-K95dNnfHE3pKHf78j7-Y",
  authDomain: "crwn-ecom-350fb.firebaseapp.com",
  projectId: "crwn-ecom-350fb",
  storageBucket: "crwn-ecom-350fb.appspot.com",
  messagingSenderId: "934399129904",
  appId: "1:934399129904:web:b968ec6b661eb250f4b0f5",
  measurementId: "G-N8XHJM8WER",
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log("error creating user", error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
