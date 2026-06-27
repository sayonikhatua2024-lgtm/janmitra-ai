import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import {
  FilePlus,
  Bot,
  Gift,
  ClipboardList,
  LogOut,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center text-blue-700">
          JanMitra AI
        </h1>

        <p className="text-center text-gray-600 mt-3 text-lg">
          Smart Citizen Complaint Portal
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

          <div
            onClick={() => navigate("/complaint")}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition"
          >
            <FilePlus size={45} className="text-blue-600 mb-4" />
            <h2 className="font-bold text-xl">Register Complaint</h2>
            <p className="text-gray-500 mt-2">
              Submit a new complaint.
            </p>
          </div>

          <div
            onClick={() => navigate("/chat")}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition"
          >
            <Bot size={45} className="text-green-600 mb-4" />
            <h2 className="font-bold text-xl">AI Assistant</h2>
            <p className="text-gray-500 mt-2">
              Ask AI for guidance.
            </p>
          </div>

          <div
            onClick={() => navigate("/schemes")}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition"
          >
            <Gift size={45} className="text-purple-600 mb-4" />
            <h2 className="font-bold text-xl">Scheme Finder</h2>
            <p className="text-gray-500 mt-2">
              Find government schemes.
            </p>
          </div>

          <div
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition"
          >
            <ClipboardList size={45} className="text-orange-500 mb-4" />
            <h2 className="font-bold text-xl">Complaint Status</h2>
            <p className="text-gray-500 mt-2">
              Track complaint progress.
            </p>
          </div>

        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
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