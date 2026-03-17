import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
export const useGoogleAuth = ({ onSuccess }) => {
  return useGoogleLogin({
    onSuccess: async (codeResponse) => {
        const res = await fetchUserProfile(codeResponse.access_token)
        localStorage.setItem("user", JSON.stringify(res.data))
        onSuccess?.(res.data);
    },
    onError: console.log
  });
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
    return { success: false, error: error.message };
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
    return { success: false, error: error.message };
  }
};

