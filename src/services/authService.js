import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
const AuthContext = createContext();
export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
const unsub = onAuthStateChanged(auth, (u) => {
setUser(u);
setLoading(false);
});
return () => unsub();
}, []);
const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    if (error.code === "auth/cancelled-popup-request") {
      console.log("Popup cancelled by browser");
    } else if (error.code === "auth/popup-closed-by-user") {
      console.log("Popup closed by user");
    } else {
      console.error(error);
    }
  }
};

const logout = async () => {
await signOut(auth);
};
return (
<AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
{children}
</AuthContext.Provider>
);
}
export const useAuth = () => useContext(AuthContext);
