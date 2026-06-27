import {
  FilePlus2,
  ClipboardList,
  Bot,
  Gift,
  Siren,
  LogOut,
} from "lucide-react";

import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

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
    <div className="min-h-screen bg-slate-100">

      <div className="bg-blue-700 text-white py-8 shadow-lg">

        <h1 className="text-4xl font-bold text-center">
          JanMitra AI
        </h1>

        <p className="text-center mt-2 text-blue-100">
          Smart Citizen Complaint Portal
        </p>

      </div>

      <div className="max-w-6xl mx-auto p-8">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.route)}
              className={`${card.color}
              text-white
              rounded-2xl
              shadow-xl
              p-8
              cursor-pointer
              hover:scale-105
              transition
              duration-300`}
            >
              {card.icon}

              <h2 className="text-2xl font-bold mt-5">
                {card.title}
              </h2>
            </div>
          ))}

        </div>

        <div className="text-center mt-12">

          <button
            onClick={logout}
            className="bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-black flex items-center gap-2 mx-auto"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;