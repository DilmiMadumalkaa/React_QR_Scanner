import { useAuth } from "../services/authService";

export default function GoogleAuthButton() {
  const { loginWithGoogle, isSigningIn } = useAuth();

  return (
    <button 
      className="w-full flex items-center justify-center gap-1 py-3 px-3 bg-gray-100 border-2 border-gray-300 rounded-xl cursor-pointer text-base font-semibold text-gray-800 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:shadow-[0_8px_24px_rgba(79,70,229,0.2)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
