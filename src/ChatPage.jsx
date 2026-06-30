import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { askSmartAssistant } from "./services/SmartAssistant";

import {
  ArrowLeft,
  Bot,
  Send,
  Sparkles,
  Loader2,
} from "lucide-react";

function ChatPage() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "👋 Hello! I'm JanMitra AI. Ask me anything about complaints, government schemes, or emergency services.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    const currentQuestion = question;

    setQuestion("");

    try {
      const response = await askSmartAssistant(currentQuestion);

      const aiMessage = {
        sender: "ai",
        text: response,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong.",
        },
      ]);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* Background */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-orange-500 opacity-30 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-500 opacity-30 blur-3xl"></div>

        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-10 blur-3xl"></div>

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

        {/* Main Card */}

        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl p-8">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 flex items-center justify-center">

              <Bot className="text-white" size={40} />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-white">

                JanMitra AI

              </h1>

              <p className="text-slate-300 mt-2">

                🇮🇳 Your Smart Civic Assistant

              </p>

            </div>

          </div>

          {/* Welcome */}

          <div className="mt-8 bg-slate-900/70 rounded-2xl p-5 border border-slate-700">

            <div className="flex gap-3">

              <Sparkles className="text-orange-400 mt-1" />

              <p className="text-slate-300 leading-8">

                Welcome to JanMitra AI.

                <br />

                Ask anything about complaints,
                government schemes,
                emergency help,
                or civic services.

              </p>

            </div>

          </div>

                    {/* Complaint Quick Questions */}

          <div className="mt-8">

            <h3 className="text-white font-semibold mb-4">

              ✨ Complaint Assistant

            </h3>

            <div className="flex flex-wrap gap-3">

              {[
                "Show my pending complaints",
                "Summarize all complaints",
                "Which complaints are resolved?",
                "How many complaints do I have?"
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => setQuestion(item)}
                  className="bg-slate-800 hover:bg-orange-500 transition-all duration-300 px-4 py-2 rounded-full text-white text-sm hover:scale-105"
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* Government Schemes */}

          <div className="mt-8">

            <h3 className="text-white font-semibold mb-4">

              🏛 Government Schemes

            </h3>

            <div className="flex flex-wrap gap-3">

              {[
                "Student Schemes",
                "Women Schemes",
                "Farmer Schemes",
                "Housing Schemes",
                "Senior Citizen Schemes",
                "Startup Schemes",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => setQuestion(item)}
                  className="bg-orange-600 hover:bg-orange-500 transition-all duration-300 px-4 py-2 rounded-full text-white text-sm hover:scale-105"
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* Emergency */}

          <div className="mt-8">

            <h3 className="text-white font-semibold mb-4">

              🚨 Emergency Help

            </h3>

            <div className="flex flex-wrap gap-3">

              {[
                "Police Emergency",
                "Medical Emergency",
                "Fire Emergency",
                "Flood",
                "Earthquake",
                "Women Helpline",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => setQuestion(item)}
                  className="bg-red-600 hover:bg-red-500 transition-all duration-300 px-4 py-2 rounded-full text-white text-sm hover:scale-105"
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* Question */}

          <textarea
            rows={4}
            value={question}
            placeholder="Ask JanMitra AI..."
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAsk();
              }
            }}
            className="w-full mt-8 rounded-2xl bg-slate-900/70 border border-slate-700 text-white p-5 outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />

          {/* Ask Button */}

          <button
            onClick={handleAsk}
            disabled={loading}
            className="mt-6 w-full rounded-2xl py-4 bg-gradient-to-r from-orange-500 to-emerald-600 hover:scale-[1.02] transition text-white font-semibold flex justify-center items-center gap-3"
          >

            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Send size={20} />
                Ask JanMitra AI
              </>
            )}

          </button>

          {/* Chat Messages */}

          <div className="mt-10 space-y-5 max-h-[450px] overflow-y-auto">
                        {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-4 whitespace-pre-wrap leading-7 shadow-lg ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-orange-500 to-emerald-600 text-white"
                      : "bg-slate-900 border border-slate-700 text-slate-200"
                  }`}
                >

                  <div className="font-semibold mb-2">

                    {msg.sender === "user"
                      ? "👤 You"
                      : "🤖 JanMitra AI"}

                  </div>

                  {msg.text}

                </div>

              </div>

            ))}

            {loading && (

              <div className="flex justify-start">

                <div className="max-w-xs rounded-2xl bg-slate-900 border border-slate-700 px-5 py-4 shadow-lg">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 flex items-center justify-center">

                      <Bot
                        size={20}
                        className="text-white animate-pulse"
                      />

                    </div>

                    <div>

                      <p className="text-white font-semibold">

                        JanMitra AI

                      </p>

                      <div className="flex gap-1 mt-2">

                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"></span>

                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.2s]"></span>

                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.4s]"></span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            )}

            <div ref={chatEndRef}></div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ChatPage;
          