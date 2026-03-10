import { useAuth } from "../services/authService";

export default function GoogleAuthButton() {
  const { loginWithGoogle, isSigningIn } = useAuth();

  return (
    <button 
      className="w-full flex items-center gap-3 py-3 px-5 bg-white border-none rounded-xl cursor-pointer text-base font-semibold text-gray-700 transition-all duration-200 ease-in-out backdrop-blur-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={loginWithGoogle}
      disabled={isSigningIn}
    >
      <div>
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google Icon"
          className="w-6 h-6"
        />
      </div>
      <span className="flex-grow text-center">Sign in with Google</span>
    </button>
  );
}
