import React from 'react';
import { useAuth } from '../services/authService';
import './GoogleAuthButton.css';
export default function GoogleAuthButton() {
const { loginWithGoogle } = useAuth();
return (
<button
onClick={loginWithGoogle}
className="px-4 py-2 bg-blue-600 text-white rounded"
>
Sign in with Google
</button>
);
}
