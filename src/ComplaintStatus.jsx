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
} from "lucide-react";

function ComplaintStatus() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    const filtered = complaints.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredComplaints(filtered);
  }, [search, complaints]);

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
    <div className="min-h-screen bg-slate-100">

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

      {/* Loading */}

      {loading && (
        <div className="text-center mt-16 text-xl">
          Loading complaints...
        </div>
      )}

      {/* No Complaint */}

      {!loading && filteredComplaints.length === 0 && (
        <div className="text-center mt-16 text-xl">
          No complaints found.
        </div>
      )}

      {/* Complaint Cards */}

      <div className="max-w-5xl mx-auto p-6 grid gap-6">

        {filteredComplaints.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >

            <div className="flex justify-between items-start flex-wrap gap-4">

              <div>

                <h2 className="text-2xl font-bold text-blue-700">
                  {item.title}
                </h2>

                <div className="flex items-center gap-2 mt-4">
                  <Folder size={18} className="text-blue-600" />
                  <span>{item.category}</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <MapPin size={18} className="text-red-500" />
                  <span>{item.location}</span>
                </div>

                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <Calendar size={18} />

                  <span>
                    {item.createdAt?.toDate
                      ? item.createdAt
                          .toDate()
                          .toLocaleDateString()
                      : "N/A"}
                  </span>

                </div>

              </div>

              <div>

                <span
                  className={`px-5 py-2 rounded-full text-white font-semibold ${
                    item.status === "Resolved"
                      ? "bg-green-600"
                      : item.status === "In Progress"
                      ? "bg-blue-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {item.status}
                </span>

              </div>

            </div>

            <hr className="my-5" />

            <p className="text-gray-700 leading-7">
              {item.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ComplaintStatus;