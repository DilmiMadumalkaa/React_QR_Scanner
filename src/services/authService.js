import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
const AuthContext = createContext();
export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [isSigningIn, setIsSigningIn] = useState(false);
useEffect(() => {
const unsub = onAuthStateChanged(auth, (u) => {
setUser(u);
setLoading(false);
});
return () => unsub();
}, []);
const loginWithGoogle = async () => {
if (isSigningIn) return;
setIsSigningIn(true);
try {
await signInWithPopup(auth, provider);
} catch (error) {
if (error.code !== 'auth/cancelled-popup-request') {
console.error('Google sign-in error:', error);
}
} finally {
setIsSigningIn(false);
}
};
const logout = async () => {
await signOut(auth);
};
return (
<AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, isSigningIn }}>
{children}
</AuthContext.Provider>
);
}
export const useAuth = () => useContext(AuthContext);
