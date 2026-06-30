import { Bell, Search, Sparkles } from "lucide-react";

function Header() {
  return (
    <div className="flex justify-between items-center mb-8">

      {/* Left */}

      <div>

        <h1 className="text-4xl font-bold text-white">

          Admin Dashboard

        </h1>

        <p className="text-slate-400 mt-2">

          AI Powered Civic Intelligence

        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            placeholder="Search..."
            className="bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none w-64"
          />

        </div>

        {/* Notification */}

        <button className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center hover:bg-slate-800">

          <Bell className="text-orange-400" />

        </button>

        {/* AI Button */}

        <button className="bg-gradient-to-r from-orange-500 to-emerald-600 px-6 py-3 rounded-xl text-white flex items-center gap-2 hover:scale-105 transition">

          <Sparkles size={18} />

          Generate AI Report

        </button>

        {/* Admin */}

        <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-700">

          <img
            src="https://ui-avatars.com/api/?name=Admin&background=ff9933&color=fff"
            alt="Admin"
            className="w-10 h-10 rounded-full"
          />

          <div>

            <p className="text-white font-semibold">

              Administrator

            </p>

            <p className="text-slate-400 text-sm">

              JanMitra AI

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Header;