import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

function ComplaintStatus() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

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
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Complaint Status
      </h1>

      {loading && (
        <p className="text-center text-xl">Loading...</p>
      )}

      {!loading && complaints.length === 0 && (
        <p className="text-center">
          No complaints found.
        </p>
      )}

      <div className="grid gap-6 max-w-4xl mx-auto">

        {complaints.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-blue-700">
              {item.title}
            </h2>

            <p className="mt-3">
              <b>Category:</b> {item.category}
            </p>

            <p>
              <b>Location:</b> {item.location}
            </p>

            <p>
              <b>Description:</b> {item.description}
            </p>

            <div className="mt-4">
              <span
                className={`px-4 py-2 rounded-full text-white ${
                  item.status === "Resolved"
                    ? "bg-green-600"
                    : "bg-yellow-500"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default ComplaintStatus;