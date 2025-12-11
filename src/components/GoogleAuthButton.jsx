import React from "react";
import { useAuth } from "../services/authService";
import "./GoogleAuthButton.css";

export default function GoogleAuthButton() {
  const { loginWithGoogle } = useAuth();

  return (
    <button className="google-signin-btn" onClick={loginWithGoogle}>
      <div className="google-icon-wrapper">
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google Icon"
        />
      </div>
      <span className="btn-text">Sign in with Google</span>
    </button>
  );
}
