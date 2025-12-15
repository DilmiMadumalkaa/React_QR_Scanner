import { useAuth } from "../services/authService";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { Navigate } from "react-router-dom";
import { SlEnvolope } from "react-icons/sl";

export default function LoginPage() {
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#4A70A9] to-[#050E3C] overflow-hidden relative">
      <div className="absolute inset-0 bg-black/30"></div>
      <div>
        {/* Logo Section */}
        <div className="items-center justify-center mb-3 flex">
          <img
            src="../slt_logo.png"
            alt="Logo"
            className="h-10 w-30"
          />
        </div>

        <div className="items-center justify-center mb-6 flex flex-col">
          <h1 className="text-[32px] font-bold mb-1 bg-gradient-to-r from-[#5CE65C] to-[#4ED7F1] text-transparent bg-clip-text">Welcome Back</h1>
          <p className="text-[15px] text-[#eaeaea] mb-[25px]">Sign in to continue</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-[18px] border border-white/20 p-20 pt-10 pb-10 w-full text-center shadow-[0_8px_28px_rgba(0,0,0,0.25)] opacity-0 animate-[fadeIn_1.2s_ease_forwards]">
          <div className="flex items-center justify-center rounded-full mb-3 bg-gradient-to-br from-[#5CE65C]/15 to-[#4ED7F1]/15 w-16 h-16 mx-auto">
            <SlEnvolope color="white" size={28} />
          </div>
          <p className="text-[17px] font-semibold text-white mb-2">Google Authentication</p>
          <p className="text-[13px] text-gray-300 mb-4">Use your registered organization email</p>
          <GoogleAuthButton />
        </div>

        <div>
          <p className="items-center justify-center mb-6 flex text-gray-300 mt-10">&copy; 2025 SLT Mobitel. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(40px, -30px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
