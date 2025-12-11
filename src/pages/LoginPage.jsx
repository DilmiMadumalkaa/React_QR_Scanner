import React from 'react';
import './LoginPage.css';
import { useAuth } from '../services/authService';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { Navigate } from 'react-router-dom';
export default function LoginPage() {
const { user } = useAuth();
if (user) return <Navigate to="/" replace />;
return (
<div className="login-container">
  <div className="login-box">
    <h1 className="login-title">Login</h1>
    <GoogleAuthButton />
  </div>
</div>
);
}
