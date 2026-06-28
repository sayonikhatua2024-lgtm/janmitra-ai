import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { askSmartAssistant } from "./services/SmartAssistant";

import {
  ArrowLeft,
  Bot,
  Send,
  Loader2,
  Sparkles,
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-violet-600 opacity-30 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500 opacity-30 blur-3xl"></div>

        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500 opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl p-8">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center">
              <Bot className="text-white" size={40} />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">
                JanMitra AI
              </h1>

              <p className="text-slate-300 mt-2">
                Your Smart Civic Assistant
              </p>
            </div>

          </div>

          {/* Welcome */}
          <div className="mt-10 bg-slate-900/70 rounded-2xl p-5 border border-slate-700">

            <div className="flex gap-3">

              <Sparkles className="text-cyan-400 mt-1" />

              <p className="text-slate-300 leading-8">
                Hello! 👋
                <br />
                Ask me anything about complaints, civic services,
                government schemes, or emergency support.
              </p>

            </div>

          </div>

          {/* Question */}
          <textarea
            rows={6}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="w-full mt-8 rounded-2xl bg-slate-900/70 border border-slate-700 text-white p-5 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {/* Ask Button */}
          <button
            onClick={handleAsk}
            disabled={loading}
            className="mt-6 w-full rounded-2xl py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition text-white font-semibold flex justify-center items-center gap-3"
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
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
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

                <div className="bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white">

                  <div className="flex items-center gap-2">

                    <span className="text-cyan-400">🤖</span>

                    <span className="font-semibold text-white">
                      JanMitra AI is thinking...
                    </span>

                    <div className="flex gap-1 ml-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></span>
                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ChatPage;