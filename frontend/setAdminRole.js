const admin = require('./firebaseAdmin'); // Import the initialized Firebase Admin SDK

// Function to assign the 'admin' role to a user
const setAdminRole = async (uid) => {
  try {
    // Set custom claims for the user (role: 'admin')
    await admin.auth().setCustomUserClaims(uid, { role: 'admin' });

    console.log(`User with UID ${uid} has been assigned the admin role.`);
  } catch (error) {
    console.error("Error assigning admin role:", error);
  }
};

// Call the function with the UID of the user you want to assign as an admin
// Replace 'uid' with the actual UID of the admin user
setAdminRole('of2EEcYGl3g4wTTquowD'); // Replace with the UID of the user
