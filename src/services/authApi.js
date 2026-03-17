import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const fetchUserProfile = (accessToken) => {
    return axios.get("https://openidconnect.googleapis.com/v1/userinfo", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json"
        }
    })
}

// Use google Auth hook
export const useGoogleAuth = ({ onSuccess, onError }) => {
  return useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await fetchUserProfile(codeResponse.access_token);
        localStorage.setItem("user", JSON.stringify(res.data));
        onSuccess?.(res.data);
      } catch (err) {
        onError?.(err);
      }
    },
    onError: (err) => {
      onError?.(err);
    }
  });
};

// Helper function to format Firebase auth errors
const formatAuthError = (error) => {
  const errorCode = error.code || '';
  console.error("Firebase Auth Error:", errorCode, error.message);
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/invalid-credential':
      return 'Invalid email or password';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    default:
      return error.message || 'Authentication failed';
  }
};

// Email/Password Login
export const loginWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = {
      email: user.email,
      name: user.displayName || user.email.split('@')[0],
      picture: user.photoURL || `https://ui-avatars.com/api/?name=${user.email.split('@')[0]}&background=random`,
      uid: user.uid
    };
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true, user: userData };
  } catch (error) {
    return { success: false, error: formatAuthError(error) };
  }
};

// Email/Password Sign Up
export const signUpWithEmailPassword = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with name
    await updateProfile(user, {
      displayName: name,
      photoURL: `https://ui-avatars.com/api/?name=${name}&background=random`
    });
    
    const userData = {
      email: user.email,
      name: name,
      picture: `https://ui-avatars.com/api/?name=${name}&background=random`,
      uid: user.uid
    };
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true, user: userData };
  } catch (error) {
    return { success: false, error: formatAuthError(error) };
  }
};

// Password Reset
export const resetPassword = async (email) => {
  try {
    const actionCodeSettings = {
      // URL you want to redirect back to after password reset
      url: window.location.origin + '/login',
      handleCodeInApp: false
    };
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    return { success: true };
  } catch (error) {
    return { success: false, error: formatAuthError(error) };
  }
};

