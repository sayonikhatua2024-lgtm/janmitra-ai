import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { askGemini } from "./services/geminiService";

import {
  ArrowLeft,
  Gift,
  Loader2,
  Search,
  Sparkles,
  User,
  Briefcase,
  IndianRupee,
  MapPin,
} from "lucide-react";


function SchemeRecommendation() {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [income, setIncome] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const findSchemes = async () => {

    if (
  !age ||
  !gender ||
  !occupation ||
  !income ||
  !state
) {
  alert("Please fill all the details.");
  return;
}

    setLoading(true);

   const prompt = `
You are an expert in Indian Government welfare schemes.

Based on the following user details:

Age: ${age}
Gender: ${gender}
Occupation: ${occupation}
Monthly Income: ₹${income}
State: ${state}

Recommend ONLY real Indian Government schemes.

For each scheme provide:

🇮🇳 Scheme Name

Purpose

Benefits

Eligibility

Who should apply

Official Website (if available)

Format the response using headings and bullet points.
`;

    const response = await askGemini(prompt);

    setResult(response);
    setLoading(false);
  };

  return (
  <div className="relative min-h-screen overflow-hidden bg-slate-950">

    {/* Background */}

    <div className="absolute inset-0">

      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-orange-500 opacity-30 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-500 opacity-30 blur-3xl"></div>

      <div className="absolute top-1/2 left-1/2 h-72 w-72 rounded-full bg-white opacity-10 blur-3xl"></div>

    </div>

    <div className="relative z-10 max-w-4xl mx-auto p-6">

      {/* Back Button */}

      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-orange-300 hover:text-orange-400 mb-8"
      >
        <ArrowLeft size={20} />
        Dashboard
      </button>

      {/* Card */}

      <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl p-8">

        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 flex items-center justify-center">

            <Gift className="text-white" size={40} />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-white">

              Government Scheme Finder

            </h1>

            <p className="text-slate-300">

              🇮🇳 Discover schemes made for you

            </p>

          </div>

        </div>

        <div className="mt-8 bg-slate-900/70 rounded-2xl p-5 border border-slate-700">

  <div className="flex gap-3">

    <Sparkles className="text-orange-400 mt-1" />

    <p className="text-slate-300 leading-8">

      Find Indian Government schemes tailored to your profile.
      <br />
      Enter your details to receive personalized recommendations.

    </p>

  </div>

</div>

        {/* Inputs */}

        <div className="grid md:grid-cols-2 gap-5 mt-10">

          <div className="relative">

  <User
    className="absolute left-4 top-4 text-orange-400"
    size={20}
  />

  <div className="relative">

  <User
    size={20}
    className="absolute left-4 top-4 text-orange-400"
  />

  <input
    type="number"
    placeholder="Age"
    value={age}
    onChange={(e) => setAge(e.target.value)}
    className="w-full rounded-xl bg-slate-900 border border-slate-700 text-white py-4 pl-12 pr-4"
  />

</div>

</div>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="rounded-xl bg-slate-900 border border-slate-700 text-white p-4"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <div className="relative">

  <Briefcase
    size={20}
    className="absolute left-4 top-4 text-orange-400"
  />

  <input
    type="text"
    placeholder="Occupation"
    value={occupation}
    onChange={(e) => setOccupation(e.target.value)}
    className="w-full rounded-xl bg-slate-900 border border-slate-700 text-white py-4 pl-12 pr-4"
  />

</div>  

          <div className="relative">

  <IndianRupee
    size={20}
    className="absolute left-4 top-4 text-orange-400"
  />

  <input
    type="number"
    placeholder="Monthly Income"
    value={income}
    onChange={(e) => setIncome(e.target.value)}
    className="w-full rounded-xl bg-slate-900 border border-slate-700 text-white py-4 pl-12 pr-4"
  />

</div>

          <div className="relative md:col-span-2">

  <MapPin
    size={20}
    className="absolute left-4 top-4 text-orange-400"
  />

  <input
    type="text"
    placeholder="State"
    value={state}
    onChange={(e) => setState(e.target.value)}
    className="w-full rounded-xl bg-slate-900 border border-slate-700 text-white py-4 pl-12 pr-4"
  />

</div>

        </div>  

        {/* Button */}

        <button
          onClick={findSchemes}
          disabled={loading}
          className="mt-8 w-full rounded-2xl py-4 bg-gradient-to-r from-orange-500 to-emerald-600 text-white font-semibold flex justify-center items-center gap-3 hover:scale-[1.02] transition"
        >

          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              🔍 Searching Government Schemes...
            </>
          ) : (
            <>
              <Search size={20} />
              Find Government Schemes
            </>
          )}

        </button>

        {/* Result */}

        {result && (

<div className="mt-8 rounded-2xl border border-orange-500/20 bg-slate-900 p-6 shadow-xl">

  <div className="flex items-center gap-3 mb-5">

    <Gift className="text-orange-400" />

    <h2 className="text-2xl font-bold text-white">

      Recommended Schemes

    </h2>

  </div>

  <div className="text-slate-300 whitespace-pre-wrap leading-8">

    {result}

  </div>

</div>

)}

      </div>

    </div>

  </div>
);
}

export default SchemeRecommendation;