import React, { useEffect, useState } from "react";
import { getAllComplaints } from "./services/firestoreService";

import Sidebar from "./components/admin/Sidebar";
import Header from "./components/admin/Header";
import StatsCards from "./components/admin/StatsCards";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
} from "recharts";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const data = await getAllComplaints();
      setComplaints(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const critical = complaints.filter(
    (c) => c.status?.toLowerCase() === "critical"
  ).length;

  // Dynamic Categories
  const categoryCounts = {};

  complaints.forEach((item) => {
    const category = item.category || "Other";
    categoryCounts[category] =
      (categoryCounts[category] || 0) + 1;
  });

  const categoryData = [
    {
      name: "Road",
      value: complaints.filter(
        c => c.category?.toLowerCase().includes("road")
      ).length,
    },
    {
      name: "Water",
      value: complaints.filter(
        c => c.category?.toLowerCase().includes("water")
      ).length,
    },
    {
      name: "Electricity",
      value: complaints.filter(
        c => c.category?.toLowerCase().includes("electric")
      ).length,
    },
    {
      name: "Garbage",
      value: complaints.filter(
        c => c.category?.toLowerCase().includes("garbage")
      ).length,
    },
  ];

  const statusData = [
    {
      name: "Pending",
      complaints: pending,
    },
    {
      name: "Resolved",
      complaints: resolved,
    },
    {
      name: "Critical",
      complaints: critical,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#14B8A6",
  ];

  const filteredComplaints = complaints.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Critical"
          ? item.priority === "Critical"
          : item.status === filter;

    return matchesSearch && matchesFilter;
  });

  const topCategory =
    categoryData.length > 0
      ? [...categoryData].sort((a, b) => b.value - a.value)[0].name
      : "None";

  const generateAIReport = () => {
    const report = `
AI Civic Report

Total Complaints : ${total}
Pending          : ${pending}
Resolved         : ${resolved}
Critical         : ${critical}

Most Reported Category : ${topCategory}

Recommendation:
${pending > resolved
        ? "Increase workforce to clear pending complaints."
        : "Current complaint resolution rate is satisfactory."
      }
`;

    alert(report);
  };
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">

        <Header />

        <StatsCards
          total={total}
          pending={pending}
          critical={critical}
          resolved={resolved}
        />

        {/* Loading */}

        {loading && (
          <div className="mt-10 rounded-3xl bg-slate-900 border border-slate-800 p-10 text-center">
            <p className="text-slate-300 text-lg">
              Loading complaints...
            </p>
          </div>
        )}

        {!loading && (
          <>

            {/* AI REPORT */}

            <div
              id="report"
              className="grid lg:grid-cols-2 gap-6 mt-8"
            >

              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

                <h2 className="text-2xl font-bold text-white mb-5">
                  🤖 AI Civic Report
                </h2>

                <div className="space-y-3 text-slate-300">

                  <p>📌 Total Complaints : {total}</p>

                  <p>🟠 Pending : {pending}</p>

                  <p>🟢 Resolved : {resolved}</p>

                  <p>🔴 Critical : {critical}</p>

                  <p className="pt-3 text-orange-400">
                    Most Reported Category :
                    <span className="font-bold ml-2">
                      {topCategory}
                    </span>
                  </p>

                </div>

                <button
                  onClick={generateAIReport}
                  className="mt-6 rounded-xl bg-gradient-to-r from-orange-500 to-emerald-600 px-6 py-3 text-white font-semibold hover:scale-105 transition"
                >
                  Generate AI Report
                </button>

              </div>

              {/* Development Priorities */}

              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

                <h2 className="text-2xl font-bold text-white mb-5">
                  🏆 Development Priorities
                </h2>

                <div className="space-y-5">

                  <div className="flex justify-between items-center">

                    <span className="text-slate-300">
                      🛣️ Road Repair
                    </span>

                    <span className="font-bold text-red-400">
                      High
                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="text-slate-300">
                      💡 Street Lights
                    </span>

                    <span className="font-bold text-yellow-400">
                      Medium
                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="text-slate-300">
                      🚰 Water Supply
                    </span>

                    <span className="font-bold text-emerald-400">
                      Normal
                    </span>

                  </div>

                  <div className="pt-4 border-t border-slate-700">

                    <p className="text-slate-400 text-sm">
                      AI recommends prioritizing departments with the
                      highest complaint volume to maximize citizen
                      satisfaction.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* CHARTS */}

            <div
              id="analytics"
              className="grid lg:grid-cols-2 gap-6 mt-8"
            >

              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

                <h2 className="text-2xl font-bold text-white mb-6">
                  📊 Complaint Categories
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >

                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>

                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) =>
                          `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip />

                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        wrapperStyle={{ color: "#ffffff" }}
                      />

                    </PieChart>
                  </ResponsiveContainer>

                </ResponsiveContainer>

              </div>

              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

                <h2 className="text-2xl font-bold text-white mb-6">
                  📈 Complaint Status
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >

                  <BarChart data={statusData}>

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="complaints"
                      fill="#F97316"
                      radius={[10, 10, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>
            {/* Complaint Hotspots */}

            <div
              id="hotspots"
              className="rounded-3xl bg-slate-900 border border-slate-800 p-6 mt-8"
            >

              <h2 className="text-2xl font-bold text-white mb-6">
                📍 Complaint Hotspots
              </h2>

              {categoryData.length === 0 ? (

                <p className="text-slate-400">
                  No complaint data available.
                </p>

              ) : (

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

                  {categoryData.map((item, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border border-slate-700 bg-slate-800 p-5 hover:border-orange-500 transition"
                    >

                      <h3 className="text-lg font-bold text-white">
                        {item.name}
                      </h3>

                      <p className="mt-3 text-slate-300">
                        {item.value} complaints
                      </p>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* Complaint Section */}

            <div
              id="complaints"
              className="mt-10"
            >

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                <h2 className="text-3xl font-bold text-white">
                  📋 Recent Complaints
                </h2>

                <div className="flex flex-col md:flex-row gap-3">

                  <input
                    type="text"
                    placeholder="Search by title, location or category..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500"
                  />

                  <select
                    value={filter}
                    onChange={(e) =>
                      setFilter(e.target.value)
                    }
                    className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
                  >
                    <option>All</option>
                    <option>Pending</option>
                    <option>Resolved</option>
                    <option>Critical</option>
                  </select>

                </div>

              </div>

              {filteredComplaints.length === 0 ? (

                <div className="rounded-3xl bg-slate-900 border border-slate-800 p-10 text-center">

                  <p className="text-slate-400">
                    No complaints found.
                  </p>

                </div>

              ) : (

                <div className="space-y-6">

                  {filteredComplaints.map((item) => (

                    <div
                      key={item.id}
                      className="rounded-3xl bg-slate-900 border border-slate-800 p-6 hover:border-orange-500 transition"
                    >

                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                        <h2 className="text-2xl font-bold text-white">
                          {item.title}
                        </h2>

                        <span
                          className={`px-4 py-2 rounded-full text-white font-semibold ${item.status === "Resolved"
                            ? "bg-green-600"
                            : "bg-orange-500"
                            }`}
                        >
                          {item.status}
                        </span>

                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-6 text-slate-300">

                        <p>
                          <b>👤 Name:</b> {item.name}
                        </p>

                        <p>
                          <b>📂 Category:</b> {item.category}
                        </p>

                        <p>
                          <b>📍 Location:</b> {item.location}
                        </p>

                        <p>
                          <b>🚨 Priority:</b>{" "}
                          <span
                            className={
                              item.priority === "Critical"
                                ? "text-red-400 font-bold"
                                : "text-green-400"
                            }
                          >
                            {item.priority || "Normal"}
                          </span>
                        </p>

                      </div>

                      <div className="mt-6">

                        <h3 className="text-white font-semibold mb-2">
                          Description
                        </h3>

                        <p className="text-slate-400 leading-7">
                          {item.description}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </>
        )}

      </main>

    </div>
  );
}

export default AdminDashboard;