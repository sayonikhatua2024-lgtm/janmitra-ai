import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import {
  Search,
  MapPin,
  Folder,
  Calendar,
  ArrowLeft,
  Clock3,
  CheckCircle2,
  Loader2,
  ClipboardX,
} from "lucide-react";

function ComplaintStatus() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {

  let filtered = complaints.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (statusFilter !== "All") {

    filtered = filtered.filter(
      (item) => item.status === statusFilter
    );

  }

  setFilteredComplaints(filtered);

}, [search, complaints, statusFilter]);

  const fetchComplaints = async () => {
    try {
      const q = query(
        collection(db, "complaints"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComplaints(data);
      setFilteredComplaints(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

<div className="absolute inset-0 pointer-events-none">

  <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-violet-600 opacity-30 blur-3xl"></div>

  <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500 opacity-30 blur-3xl"></div>

  <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500 opacity-20 blur-3xl"></div>

</div>

<div className="relative z-10">

  
  
</div>
      {/* Header */}

      <div className="bg-blue-700 text-white shadow-lg">

        <div className="max-w-6xl mx-auto py-8 px-6">

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 mb-6 hover:text-gray-200"
          >
            <ArrowLeft size={20} />
            Dashboard
          </button>

          <h1 className="text-4xl font-bold text-center">
            Complaint Status
          </h1>

          <p className="text-center mt-2 text-blue-100">
            Track all your submitted complaints
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="max-w-4xl mx-auto mt-8 px-5">

        <div className="relative">

          <Search
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search Complaint..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      <div className="flex flex-wrap gap-3 mt-6">

  {[
    "All",
    "Pending",
    "In Progress",
    "Resolved",
  ].map((status) => (

    <button
      key={status}
      onClick={() => setStatusFilter(status)}
      className={`px-5 py-2 rounded-full font-medium transition-all duration-300

      ${
        statusFilter === status
          ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/40"
          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      {status}
    </button>

  ))}

</div>

      {/* Loading */}

      {loading && (
        <div className="flex justify-center items-center mt-24">

  <Loader2
    size={45}
    className="animate-spin text-cyan-400"
  />

</div>
      )}

      {/* No Complaint */}

      {!loading && filteredComplaints.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24">

  <ClipboardX
    size={70}
    className="text-slate-500 mb-5"
  />

  <h2 className="text-2xl text-white font-bold">

    No complaints found

  </h2>

  <p className="text-slate-400 mt-2">

    Try changing your search or filter.

  </p>

</div>
      )}

      {/* Complaint Cards */}

      {filteredComplaints.map((item) => (

  <div
    key={item.id}
    className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl p-7 hover:scale-[1.02] hover:shadow-cyan-500/20 transition-all duration-300"
  >

    {/* Header */}

    <div className="flex justify-between items-start flex-wrap gap-4">

      <div>

        <h2 className="text-2xl font-bold text-white">
          {item.title}
        </h2>

        <div className="flex items-center gap-5 mt-5 flex-wrap">

          <div className="flex items-center gap-2 text-slate-300">

            <Folder
              size={18}
              className="text-cyan-400"
            />

            {item.category}

          </div>

          <div className="flex items-center gap-2 text-slate-300">

            <MapPin
              size={18}
              className="text-pink-400"
            />

            {item.location}

          </div>

          <div className="flex items-center gap-2 text-slate-400">

            <Calendar
              size={18}
            />

            {item.createdAt?.toDate
              ? item.createdAt.toDate().toLocaleDateString()
              : "N/A"}

          </div>

        </div>

      </div>

      {/* Status */}

      <div>

        {item.status === "Resolved" && (

          <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-300 flex items-center gap-2">

            <CheckCircle2 size={18} />

            Resolved

          </span>

        )}

        {item.status === "Pending" && (

          <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-300 flex items-center gap-2">

            <Clock3 size={18} />

            Pending

          </span>

        )}

        {item.status === "In Progress" && (

          <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 flex items-center gap-2">

            <Loader2
              size={18}
              className="animate-spin"
            />

            In Progress

          </span>

        )}

      </div>

    </div>

    <div className="h-px bg-slate-700 my-6"></div>

    <p className="text-slate-300 leading-8">

      {item.description}

    </p>

  </div>

))}

    </div>
  );
}

export default ComplaintStatus;