import React from "react";
import "./LoginPage.css";
import { useAuth } from "../services/authService";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="login-container">
      <div className="floating-blobs">
        <div className="blob"></div>
        <div className="blob two"></div>
      </div>

      <div className="login-box glass-effect fade-in">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue</p>
        <GoogleAuthButton />
      </div>
    </div>
  );
}
