import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import styles from './profile.module.css';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "No Name");
        setPhotoURL(currentUser.photoURL || "");
      } else {
        router.push("/login"); // Redirect to login page if not logged in
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login"); // Redirect to login page after logout
  };

  const handleUpdateProfile = async () => {
    try {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          // Update the user profile document in Firestore
          await updateDoc(userRef, {
            name: name,
            photoURL: photoURL,
          });
          alert("Profile updated successfully!");
          router.push("/");  // Redirect to home page after profile update
        } else {
          alert("No user document found.");
          router.push("/"); // Redirect to home if no document is found
        }
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.profileContainer}>
      {user ? (
        <>
          <h1 className="text-3xl font-bold mb-4">User Profile</h1>
          <div className={styles.profileDetails}>
            <img
              src={photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=200"}
              alt="User Profile Picture"
              className={styles.profileImage}
            />
            <div>
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Update Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.inputField}
            />
            <input
              type="text"
              placeholder="Update Photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className={styles.inputField}
            />
            <button onClick={handleUpdateProfile} className={styles.updateButton}>Update Profile</button>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
