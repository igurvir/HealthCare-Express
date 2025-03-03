import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXzIs5pF5vmkBcn3VDYYscjbbv4-Xp-IQ",
  authDomain: "healthcareexpress-f966c.firebaseapp.com",
  projectId: "healthcareexpress-f966c",
  storageBucket: "healthcareexpress-f966c.appspot.com",
  messagingSenderId: "992832446862",
  appId: "1:992832446862:web:f959477d948e9ee04ac4df",
  measurementId: "G-6QYXF9SQZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Helper function to create a user document in Firestore if it doesn't exist
const createUserDocument = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    // Create a user document in Firestore
    await setDoc(userRef, {
      name: user.displayName || "Unknown User",
      email: user.email || "No email provided",
      photoURL: user.photoURL || "",
      role: "CUSTOMER", // Default role
    });
  }
};

// Sign In With Google + Save User in Firestore
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user) throw new Error("Google authentication failed.");

    // Ensure user document exists before continuing
    await createUserDocument(user);

    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

// Email/Password Sign Up + Save Profile Data in Firestore
const signUpWithEmail = async (email, password, name) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Save additional user info in Firestore
    await setDoc(
      doc(db, "users", user.uid),
      {
        name: name,
        email: user.email,
        role: "CUSTOMER", // Default role
      },
      { merge: true }
    );
    return user;
  } catch (error) {
    console.error("Email Sign-Up Error:", error);
    throw error;
  }
};

// Email/Password Login + Update Profile from Firestore if needed
const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Fetch user's profile data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Update Firebase Authentication profile (displayName, photoURL)
      if (user.displayName !== userData.name) {
        await updateProfile(user, { displayName: userData.name });
      }
      if (user.photoURL !== userData.photoURL) {
        await updateProfile(user, { photoURL: userData.photoURL });
      }
    }

    return user;
  } catch (error) {
    console.error("Email Login Error:", error);
    throw error;
  }
};

// Log Out
const logOut = async () => {
  await signOut(auth);
  console.log("User logged out successfully.");
};

export { app, db, auth, provider, signInWithGoogle, signUpWithEmail, loginWithEmail, logOut };
