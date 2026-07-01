import {
  LayoutDashboard,
  FileText,
  Trophy,
  MapPin,
  Bot,
  Gift,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  Download,
} from "lucide-react";

function Sidebar() {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      alert("Coming Soon 🚀");
    }
  };

  const menus = [
    {
      icon: <LayoutDashboard size={20} />,
      name: "Dashboard",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      icon: <FileText size={20} />,
      name: "All Complaints",
      action: () => scrollToSection("complaints"),
    },
    {
      icon: <Trophy size={20} />,
      name: "Priority Ranking",
      action: () => scrollToSection("report"),
    },
    {
      icon: <MapPin size={20} />,
      name: "Hotspots",
      action: () => scrollToSection("hotspots"),
    },
    {
      icon: <Bot size={20} />,
      name: "AI Civic Report",
      action: () => scrollToSection("report"),
    },
    {
      icon: <Gift size={20} />,
      name: "Schemes",
      action: () => alert("Government Schemes page coming soon."),
    },
    {
      icon: <BarChart3 size={20} />,
      name: "Analytics",
      action: () => scrollToSection("analytics"),
    },
    {
      icon: <Users size={20} />,
      name: "Users",
      action: () => alert("Users Management Coming Soon"),
    },
    {
      icon: <MessageSquare size={20} />,
      name: "Feedback",
      action: () => alert("Feedback Module Coming Soon"),
    },
    {
      icon: <Settings size={20} />,
      name: "Settings",
      action: () => alert("Settings Coming Soon"),
    },
  ];

  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800 min-h-screen flex flex-col">

      <div className="p-6 border-b border-slate-800">

        <h1 className="text-3xl font-black">
          <span className="text-orange-400">JanMitra</span>{" "}
          <span className="text-emerald-400">AI</span>
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Smart Civic Portal
        </p>

      </div>

      <div className="flex-1 px-4 py-6 space-y-2">

        {menus.map((item) => (

          <button
            key={item.name}
            onClick={item.action}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${
              item.name === "Dashboard"
                ? "bg-gradient-to-r from-orange-500/20 to-emerald-500/20 border border-orange-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {item.icon}
            {item.name}
          </button>

        ))}

      </div>

      <div className="p-5 border-t border-slate-800">

        <div className="bg-slate-900 rounded-2xl p-4">

          <p className="text-white font-semibold">
            Download Reports
          </p>

          <p className="text-slate-400 text-sm mt-2">
            Export complaint data and AI reports.
          </p>

          <button
            onClick={() => window.print()}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-orange-500 to-emerald-600 py-3 text-white flex justify-center items-center gap-2 hover:scale-[1.02] transition"
          >
            <Download size={18} />
            Download PDF
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;