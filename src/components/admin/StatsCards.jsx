import {
  FileText,
  Clock3,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

function StatsCards({
  total = 0,
  pending = 0,
  critical = 0,
  resolved = 0,
}) {
  const cards = [
    {
      title: "Total Complaints",
      value: total,
      icon: <FileText size={28} />,
      color: "from-blue-500 to-cyan-500",
      iconColor: "text-cyan-300",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock3 size={28} />,
      color: "from-orange-500 to-amber-500",
      iconColor: "text-orange-200",
    },
    {
      title: "Critical",
      value: critical,
      icon: <AlertTriangle size={28} />,
      color: "from-red-500 to-rose-600",
      iconColor: "text-red-200",
    },
    {
      title: "Resolved",
      value: resolved,
      icon: <CheckCircle2 size={28} />,
      color: "from-emerald-500 to-green-600",
      iconColor: "text-green-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 shadow-xl hover:scale-105 transition-all duration-300`}
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-white/80 text-sm">

                {card.title}

              </p>

              <h2 className="text-4xl font-bold text-white mt-2">

                {card.value}

              </h2>

            </div>

            <div
              className={`w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center ${card.iconColor}`}
            >

              {card.icon}

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default StatsCards;