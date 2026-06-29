import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { askGemini } from "./services/geminiService";

import {
  ArrowLeft,
  ShieldAlert,
  Phone,
  Ambulance,
  Flame,
  HeartHandshake,
  Bot,
  Send,
  Loader2,
} from "lucide-react";

function EmergencyHelp() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askEmergencyAI = async () => {
    if (!question.trim()) return;

    setLoading(true);

    const prompt = `
You are an Emergency Response Assistant.

The user says:

${question}

Provide immediate safety advice.

Tell them which emergency service to contact.

Mention that AI cannot replace emergency responders.

Keep the answer under 200 words.
`;

    const response = await askGemini(prompt);

    setAnswer(response);

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* Background */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-orange-500 opacity-30 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-500 opacity-30 blur-3xl"></div>

        <div className="absolute top-1/2 left-1/2 h-72 w-72 rounded-full bg-white opacity-10 blur-3xl"></div>

      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">

        {/* Back */}

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-orange-300 hover:text-orange-400 mb-8"
        >
          <ArrowLeft size={20} />
          Dashboard
        </button>

        {/* Header */}

        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl p-8">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">

              <ShieldAlert
                className="text-white"
                size={42}
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-white">

                Emergency Help

              </h1>

              <p className="text-slate-300">

                🇮🇳 Quick access to emergency services

              </p>
              <div className="mt-8 bg-slate-900/70 rounded-2xl p-5 border border-slate-700">

<div className="flex gap-3">

<ShieldAlert className="text-red-400 mt-1"/>

<p className="text-slate-300 leading-8">

Stay calm during emergencies.

Access important helplines and receive AI-powered guidance for immediate assistance.

</p>

</div>

</div>

            </div>

          </div>

          {/* Numbers */}

          <div className="grid md:grid-cols-3 gap-5 mt-10">

            {[
              {
                icon: <Phone size={35} />,
                title: "Police",
                number: "112",
              },
              {
                icon: <Ambulance size={35} />,
                title: "Ambulance",
                number: "108",
              },
              {
                icon: <Flame size={35} />,
                title: "Fire",
                number: "101",
              },
              {
                icon: <HeartHandshake size={35} />,
                title: "Women",
                number: "1091",
              },
              {
                icon: <ShieldAlert size={35} />,
                title: "Child",
                number: "1098",
              },
              {
                icon: <ShieldAlert size={35} />,
                title: "Disaster",
                number: "1078",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="rounded-2xl bg-slate-900 border border-slate-700 p-6 text-center hover:scale-105
hover:-translate-y-2
hover:shadow-red-500/30
hover:shadow-2xl transition"
              >

                <div className="text-red-400 flex justify-center">

                  {item.icon}

                </div>

                <h2 className="text-xl font-bold text-white mt-4">

                  {item.title}

                </h2>

                <p className="text-3xl font-bold text-orange-300 mt-2">

                  {item.number}

                </p>
                <a
  href={`tel:${item.number}`}
  className="inline-block mt-4 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 transition text-white font-semibold"
>
  📞 Call Now
</a>

              </div>

            ))}

          </div>

          {/* Tips */}

          <div className="mt-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6">

            <h2 className="text-2xl font-bold text-amber-300">

              ⚠ Emergency Tips

            </h2>

            <ul className="text-slate-300 mt-4 space-y-2">

              <li>• Stay calm and assess the situation.</li>

              <li>• Call the nearest emergency service immediately.</li>

              <li>• Share your exact location.</li>

              <li>• Follow official instructions.</li>

              <li>• Keep emergency contacts saved.</li>

            </ul>

          </div>

          {/* AI */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold text-white mb-4">

              🤖 AI Emergency Assistant

            </h2>
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">

  <p className="text-red-300 text-sm leading-7">

    ⚠ This AI provides general guidance only.
    In life-threatening situations,
    immediately call the appropriate emergency service
    or visit the nearest hospital.

  </p>

</div>

            <textarea
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Describe your emergency..."
              className="w-full rounded-2xl bg-slate-900 border border-slate-700 text-white p-5"
            />

            <button
              onClick={askEmergencyAI}
              disabled={loading}
              className="mt-6 w-full rounded-2xl py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold flex justify-center items-center gap-3"
            >

              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Send />
                  Ask AI
                </>
              )}

            </button>

            {answer && (

              <div className="mt-8 rounded-2xl bg-slate-900 border border-slate-700 p-6">

                <div className="flex items-center gap-2 text-orange-300 mb-4">

                  <Bot />

                  <h2 className="text-xl font-bold">

                    AI Guidance

                  </h2>

                </div>

                <div className="text-slate-300 whitespace-pre-wrap leading-8">

                  {answer}

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmergencyHelp;