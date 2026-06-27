import { useState } from "react";
import {
  User,
  FileText,
  MapPin,
  ClipboardList,
  Send,
} from "lucide-react";
import { saveComplaint } from "./services/firestoreService";

function ComplaintForm() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.location
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);

      await saveComplaint({
        ...formData,
        status: "Pending",
      });

      alert("Complaint Submitted Successfully ✅");

      setFormData({
        name: "",
        title: "",
        description: "",
        category: "",
        location: "",
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-blue-700 text-center">
          Register Complaint
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Help us improve your city by reporting civic issues.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="relative">
            <ClipboardList className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              name="title"
              placeholder="Complaint Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
            <textarea
              name="description"
              rows="5"
              placeholder="Describe your complaint..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Category</option>
            <option>Roads</option>
            <option>Water</option>
            <option>Electricity</option>
            <option>Garbage</option>
            <option>Health</option>
            <option>Others</option>
          </select>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
          >
            <Send size={18} />
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ComplaintForm;