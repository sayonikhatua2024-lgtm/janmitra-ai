import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import {
  Mail,
  Lock,
  LogIn,
  UserPlus,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // REGISTER
  const register = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          email,
          createdAt: new Date().toString(),
        }
      );

      alert("Registration Successful 🚀");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const login = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Successful 🎉");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = () => {
    navigate("/admin");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-6">

      {/* Background Blobs */}

      <div className="absolute w-96 h-96 bg-orange-500 rounded-full blur-[140px] opacity-30 top-[-100px] left-[-80px] animate-pulse"></div>

      <div className="absolute w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-30 bottom-[-120px] right-[-60px] animate-pulse"></div>

      <div className="absolute w-72 h-72 bg-orange-300 rounded-full blur-[130px] opacity-20 top-1/2 left-1/2 -translate-x-1/2"></div>

      {/* Login Card */}

      <div className="relative z-10 w-full max-w-lg px-6">

        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10">

          {/* Logo */}

          <div className="flex justify-center">

            <div
              className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 via-white to-emerald-500
    flex items-center justify-center
    shadow-2xl
    transition-all duration-500
    hover:scale-110
    hover:rotate-12
    hover:hover:shadow-orange-400/50
    cursor-pointer"
            >

              <ShieldCheck
                className="text-white"
                size={52}
                strokeWidth={2.5}
              />

            </div>

          </div>



          <h1 className="text-center text-5xl font-black mt-6 bg-gradient-to-r from-orange-400 via-white to-emerald-400 bg-clip-text text-transparent">
            JanMitra AI
          </h1>

          <p className="text-center text-slate-300 mt-2">
            Smart Citizen Complaint Portal
          </p>
          <p className="mt-5 text-center text-slate-400 leading-7">
            Welcome back 👋
            <br />
            Sign in to access your AI-powered citizen portal.
          </p>

          <div className="flex justify-center mt-2">

            <div className="flex items-center gap-2 text-orange-300 text-sm">

              <Sparkles size={16} />

              AI Powered • Secure • Fast

            </div>

          </div>

          {/* Email */}

          <div className="relative mt-10">

            <Mail
              className="absolute left-4 top-4 text-slate-400"
              size={20}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 py-4 pl-12 pr-4 text-white placeholder:text-slate-400 shadow-inner outline-none transition-all duration-300 focus:border-orange-400 focus:ring-orange-500"
            />

          </div>

          {/* Password */}

          <div className="relative mt-5">

            <Lock
              className="absolute left-4 top-4 text-slate-400"
              size={20}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 py-4 pl-12 pr-12 text-white placeholder:text-slate-400 shadow-inner outline-none transition-all duration-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-5 text-slate-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Buttons */}

          <button
            onClick={login}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-emerald-600 py-5 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,165,0,.5)]"
          >
            <div className="flex justify-center items-center gap-2">

              <LogIn size={20} />

              {loading ? "Signing In..." : "Login"}

            </div>

          </button>

          <button
            onClick={register}
            disabled={loading}
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-emerald-600 py-5 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(22,163,74,.45)]"
          >

            <div className="flex justify-center items-center gap-2">

              <UserPlus size={20} />

              Create Account

            </div>

          </button>

          <button
            onClick={adminLogin}
            disabled={loading}
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-600 py-5 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,153,51,.45)]"
          >
            <div className="flex justify-center items-center gap-3">

              <span className="text-2xl">🛡️</span>

              <div className="flex flex-col items-start">

                <span className="font-bold text-lg">
                  Admin Portal
                </span>

                <span className="text-xs text-white/90">
                  MP & Officer Portal
                </span>

              </div>

            </div>
          </button>

          <div className="mt-8 border-t border-slate-700 pt-5">

            <p className="text-center text-slate-400 text-sm">
              🔒 Secured by Firebase Authentication
            </p>



          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;