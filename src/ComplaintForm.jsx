import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveComplaint } from "./services/firestoreService";

import {
  User,
  ClipboardList,
  FileText,
  MapPin,
  Send,
  ArrowLeft,
  CheckCircle,
  Construction,
  Droplets,
  Zap,
  Trash2,
  HeartPulse,
  Package,
  LocateFixed,
  Camera,
  X,
} from "lucide-react";



function ComplaintForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getCurrentLocation = () => {

  if (!navigator.geolocation) {
    alert("Geolocation is not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(

    (position) => {

      const latitude = position.coords.latitude.toFixed(5);
      const longitude = position.coords.longitude.toFixed(5);

      setFormData({
        ...formData,
        location: `${latitude}, ${longitude}`,
      });

    },

    () => {
      alert("Unable to fetch location.");
    }

  );

};

const handleImage = (e) => {

  if (e.target.files[0]) {

    setImage(e.target.files[0]);

  }

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
  <div className="relative min-h-screen overflow-hidden bg-slate-950">

    {/* Aurora Background */}

    <div className="absolute inset-0">

      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-violet-600 opacity-30 blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500 opacity-30 blur-3xl animate-pulse"></div>

      <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500 opacity-20 blur-3xl"></div>

    </div>

    <div className="relative z-10 flex justify-center items-center min-h-screen px-5 py-10">

      <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl p-10">

        {/* Back Button */}

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-cyan-300 hover:text-white transition mb-8"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* Heading */}

        <h1 className="text-5xl font-black text-white text-center">
          Register Complaint
        </h1>

        <p className="text-center text-slate-300 mt-3 mb-10">
          Report civic issues quickly and help build a smarter city.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}

          <div className="relative">

            <User
              size={20}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-2xl bg-slate-900/80 border border-slate-700 py-4 pl-12 pr-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

          </div>

          {/* Complaint Title */}

          <div className="relative">

            <ClipboardList
              size={20}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              name="title"
              placeholder="Complaint Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl bg-slate-900/80 border border-slate-700 py-4 pl-12 pr-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

          </div>

          {/* Description */}

          <div className="relative">

            <FileText
              size={20}
              className="absolute left-4 top-4 text-slate-400"
            />

            <textarea
              name="description"
              placeholder="Describe the issue..."
              rows="5"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-2xl bg-slate-900/80 border border-slate-700 py-4 pl-12 pr-4 text-white placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

          </div>

         {/* Category */}

<div>

  <h3 className="text-white text-lg font-semibold mb-4">
    Choose Category
  </h3>

  <div className="grid grid-cols-2 gap-4">

    {[
      {
        name: "Roads",
        icon: Construction,
      },
      {
        name: "Water",
        icon: Droplets,
      },
      {
        name: "Electricity",
        icon: Zap,
      },
      {
        name: "Garbage",
        icon: Trash2,
      },
      {
        name: "Health",
        icon: HeartPulse,
      },
      {
        name: "Others",
        icon: Package,
      },
    ].map((category) => {

      const Icon = category.icon;

      const selected =
        formData.category === category.name;

      return (

        <button
          key={category.name}
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              category: category.name,
            })
          }
          className={`relative rounded-2xl border p-5 transition-all duration-300

          ${
            selected
              ? "border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/20 scale-105"
              : "border-slate-700 bg-slate-900/70 hover:border-cyan-500 hover:scale-105"
          }`}
        >

          {selected && (

            <CheckCircle
              className="absolute right-3 top-3 text-cyan-400"
              size={20}
            />

          )}

          <Icon
            className={`mb-3 ${
              selected
                ? "text-cyan-300"
                : "text-slate-300"
            }`}
            size={30}
          />

          <p
            className={`font-semibold ${
              selected
                ? "text-white"
                : "text-slate-300"
            }`}
          >
            {category.name}
          </p>

        </button>

      );

    })}

  </div>

</div>

          {/* Location */}

<div>

  <div className="flex justify-between items-center mb-3">

    <label className="text-white font-semibold">
      Location
    </label>

    <button
      type="button"
      onClick={getCurrentLocation}
      className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition"
    >
      <LocateFixed size={18} />
      Use Current Location
    </button>

  </div>

  <div className="relative">

    <MapPin
      size={20}
      className="absolute left-4 top-4 text-slate-400"
    />

    <input
      type="text"
      name="location"
      placeholder="Enter location"
      value={formData.location}
      onChange={handleChange}
      className="w-full rounded-2xl bg-slate-900/80 border border-slate-700 py-4 pl-12 pr-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    />

  </div>

</div>

{/* Upload Image */}

<div>

  <label className="text-white font-semibold block mb-3">

    Complaint Image (Optional)

  </label>

  {!image ? (

    <label
      className="cursor-pointer border-2 border-dashed border-slate-600 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-cyan-500 transition"
    >

      <Camera
        size={42}
        className="text-cyan-400 mb-4"
      />

      <p className="text-slate-300">
        Click to Upload Image
      </p>

      <p className="text-slate-500 text-sm mt-2">
        JPG • PNG • JPEG
      </p>

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleImage}
      />

    </label>

  ) : (

    <div className="relative">

      <img
        src={URL.createObjectURL(image)}
        alt="Preview"
        className="rounded-2xl w-full h-64 object-cover"
      />

      <button
        type="button"
        onClick={() => setImage(null)}
        className="absolute top-3 right-3 bg-red-500 rounded-full p-2"
      >

        <X size={18} className="text-white"/>

      </button>

    </div>

  )}

</div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-cyan-500/50"
          >
            <div className="flex justify-center items-center gap-3">

              <Send size={20} />

              {loading
                ? "Submitting..."
                : "Submit Complaint"}

            </div>

          </button>

        </form>

      </div>

    </div>

  </div>
);
}

export default ComplaintForm;