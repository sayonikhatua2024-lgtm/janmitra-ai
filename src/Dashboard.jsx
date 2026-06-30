import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

import {
  FilePlus2,
  ClipboardList,
  Bot,
  Gift,
  Siren,
  LogOut,
  Sparkles,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
  try {
    await signOut(auth);

    alert("Logged Out Successfully");

    navigate("/");

  } catch (error) {
    alert(error.message);
  }
};
const goComplaint = () => navigate("/complaint");

const goStatus = () => navigate("/status");

const goChat = () => navigate("/chat");

const goSchemes = () => navigate("/schemes");

const goEmergency = () => navigate("/emergency");

  const cards = [
    {
      title: "Register Complaint",
      icon: <FilePlus2 size={40} />,
      color: "bg-blue-600",
      route: "/complaint",
    },
    {
      title: "Complaint Status",
      icon: <ClipboardList size={40} />,
      color: "bg-green-600",
      route: "/status",
    },
    {
      title: "AI Assistant",
      icon: <Bot size={40} />,
      color: "bg-purple-600",
      route: "/chat",
    },
    {
      title: "Government Schemes",
      icon: <Gift size={40} />,
      color: "bg-orange-500",
      route: "/schemes",
    },
    {
      title: "Emergency Help",
      icon: <Siren size={40} />,
      color: "bg-red-600",
      route: "/emergency",
    },
  ];

  return (
  <div className="relative min-h-screen overflow-hidden bg-slate-950">

    {/* Aurora Background */}

    <div className="absolute inset-0">

      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-orange-500 opacity-30 blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-500 opacity-30 blur-3xl animate-pulse"></div>

      <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-15 blur-3xl"></div>

    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

      {/* Header */}

      <div className="text-center">

        <h1 className="text-5xl font-black bg-gradient-to-r from-orange-400 via-white to-emerald-400 bg-clip-text text-transparent">
          JanMitra AI
        </h1>

        <p className="text-slate-300 mt-3 text-lg">
          Smart Citizen Complaint Portal
        </p>
        <p className="text-orange-300 mt-2">
  🇮🇳 Digital India • AI Powered Governance
  <Sparkles size={18} className="text-orange-400" />
</p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-5 py-2 border border-orange-500/20">

          <Sparkles className="text-orange-400" size={18} />

          <span className="text-orange-300">
            Welcome back 👋
          </span>

        </div>

      </div>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-3 gap-8 mt-14">

        {/* Complaint */}

        <button
          onClick={goComplaint}
          className="group rounded-3xl bg-gradient-to-br from-orange-500 to-orange-700 p-8 shadow-xl hover:scale-105
hover:-translate-y-2
hover:shadow-2xl
hover:ring-2
hover:ring-white/20 transition-all duration-300"
        >

          <FilePlus2
            size={60}
            className="text-orange-400 group-hover:rotate-6 transition"
          />

          <h2 className="text-2xl font-bold text-white mt-6">
            Register Complaint
          </h2>

          <p className="text-white/90 mt-3">
            Submit civic complaints instantly.
          </p>

        </button>

        {/* Status */}

        <button
          onClick={goStatus}
          className="group rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 shadow-xl hover:scale-105 hovhover:scale-105
hover:-translate-y-2
hover:shadow-2xl
hover:ring-2
hover:ring-white/20er:-translate-y-2 transition-all duration-300"
        >

          <ClipboardList
            size={60}
            className="text-emerald-400 group-hover:rotate-6 transition"
          />

          <h2 className="text-2xl font-bold text-white mt-6">
            Complaint Status
          </h2>

          <p className="text-white/90 mt-3">
            Track your complaint progress.
          </p>

        </button>

        {/* AI */}

        <button
          onClick={goChat}
          className="group rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-emerald-600 p-8 shadow-xl hover:scale-105 hohover:scale-105
hover:-translate-y-2
hover:shadow-2xl
hover:ring-2
hover:ring-white/20ver:-translate-y-2 transition-all duration-300"
        >

          <Bot
            size={60}
            className="text-white group-hover:rotate-6 transition"
          />

          <h2 className="text-2xl font-bold text-white mt-6">
            AI Assistant
          </h2>

          <p className="text-white/90 mt-3">
            Get instant AI-powered guidance.
            
          </p>

        </button>

        {/* Schemes */}

        <button
          onClick={goSchemes}
          className="group rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-emerald-600 p-8 shadow-xl hover:scale-105 hover:-transhover:scale-105
hover:-translate-y-2
hover:shadow-2xl
hover:ring-2
hover:ring-white/20late-y-2 transition-all duration-300"
        >

          <Gift
            size={60}
            className="text-white group-hover:rotate-6 transition"
          />

          <h2 className="text-2xl font-bold text-white mt-6">
            Government Schemes
          </h2>

          <p className="text-white/90 mt-3">
            Discover schemes suited for you.
          </p>

        </button>

        {/* Emergency */}

        <button
          onClick={goEmergency}
          className="group rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 p-8 shadow-xl hover:scale-105 hohover:scale-105
hover:-translate-y-2
hover:shadow-2xl
hover:ring-2
hover:ring-white/20ver:-translate-y-2 transition-all duration-300"
        >

          <Siren
            size={60}
            className="text-red-400 group-hover:rotate-6 transition"
          />

          <h2 className="text-2xl font-bold text-white mt-6">
            Emergency Help
          </h2>

          <p className="text-white/90 mt-3">
            Quick access to emergency support.
          </p>

        </button>

        {/* Logout */}

        <button
          onClick={logout}
          className="group rounded-3xl bg-gradient-to-br from-orange-900 to-red-900 p-8 shadow-xl hover:scale-105 hover:-trahover:scale-105
hover:-translate-y-2
hover:shadow-2xl
hover:ring-2
hover:ring-white/20nslate-y-2 transition-all duration-300"
        > 
        
          <LogOut
            size={60}
            className="text-white group-hover:translate-x-1 transition"
          />

          <h2 className="text-2xl font-bold text-white mt-6">
            Logout
          </h2>

          <p className="text-white/90 mt-3">
            Securely sign out of your account.
          </p>

        </button>

      </div>

      {/* Footer */}

      <div className="text-center mt-16">

        <p className="text-slate-400">
          Empowering Citizens • Strengthening India 
        </p>

      </div>

    </div>

  </div>
);
}

export default Dashboard;