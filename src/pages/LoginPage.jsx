import { useAuth } from "../services/authService";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { Navigate } from "react-router-dom";
import { SlEnvolope } from "react-icons/sl";

export default function LoginPage() {
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 overflow-hidden  relative text-gray-800">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/20 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#050E3C]/10 to-indigo-200/20 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative z-10 mx-6">
        {/* Logo Section */}
        <div className="items-center justify-center mb-3 flex">
          <img
            src="../slt_logo.png"
            alt="Logo"
            className="h-10 w-30"
          />
        </div>

        <div className="items-center justify-center mb-6 flex flex-col">
          <h1 className="text-[32px] font-bold mb-1 bg-gradient-to-r from-[#050E3C] to-indigo-600 text-transparent bg-clip-text">Welcome Back</h1>
          <p className="text-[15px] text-gray-600 mb-[25px]">Sign in to continue</p>
        </div>

        <div className="bg-white rounded-[18px] border border-indigo-100 p-20 pt-10 pb-10 w-full text-center shadow-[0_8px_32px_rgba(79,70,229,0.1)] opacity-0 animate-[fadeIn_1.2s_ease_forwards] backdrop-blur-sm">
          <div className="flex items-center justify-center rounded-full mb-3 bg-gradient-to-br from-[#050E3C]/10 to-indigo-100/40 w-16 h-16 mx-auto border border-indigo-200/50 animate-float">
            <div className="absolute w-16 h-16 rounded-full border-2 border-indigo-300/30 animate-pulse"></div>
            <SlEnvolope color="#050E3C" size={28} />
          </div>
          <p className="text-[17px] font-semibold bg-gradient-to-r from-[#050E3C] to-indigo-600 text-transparent bg-clip-text mb-2">Google Authentication</p>
          <p className="text-[13px] text-gray-600 mb-4">Use your registered organization email</p>
          <GoogleAuthButton />
        </div>

        <div>
          <p className="items-center justify-center mb-6 flex text-gray-600 mt-10">&copy; 2025 SLT Mobitel. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-12px);
          }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0;
            transform: scale(1.4);
          }
        }
      `}</style>
    </div>
  );
}
