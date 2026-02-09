import { useState } from "react";
import { DisclaimerBanner } from "./components/DisclaimerBanner";
import { QueryInput } from "./components/QueryInput";
import { AnswerDisplay } from "./components/AnswerDisplay";
import backgroundImage from "./assets/f5433929d445c93c69ae45a05276e1ee4a14ec11.png";


type ResponseType = {
  type: "answer" | "clarification" | "refusal";
  content: string;
  sources?: string[];
};

export default function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (queryText: string) => {
    if (!queryText.trim()) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: queryText })
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data = await res.json();

      if (!data.answer) {
        setResponse({
          type: "clarification",
          content:
            "Your question is broad. Please specify whether you are asking about constitutional rights, criminal procedure, or offences."
        });
      } else {
        setResponse({
          type: "answer",
          content: data.answer,
          sources: data.sources ?? []
        });
      }
    } catch {
      setResponse({
        type: "refusal",
        content:
          "Vidhan-AI is currently unavailable. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative" style={{ fontFamily: "'EB Garamond', serif" }}>
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: "fixed"
        }}
      />

      <div className="fixed inset-0 bg-[#f5e6d3]/40 pointer-events-none"></div>


      <div className="relative z-10">
        <header className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3d2817] via-[#5a3825] to-[#3d2817] opacity-95"></div>

          <div className="relative max-w-5xl mx-auto px-8 py-16 sm:px-12 text-center">
            <h1
              className="text-6xl sm:text-7xl text-[#d4af37] tracking-[0.3em] mb-4"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              VIDHAN-AI
            </h1>

            <p
              className="text-xl text-[#e6d4b8] tracking-[0.25em] uppercase mb-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              A Compendium of Indian Legal Knowledge
            </p>

            <p className="text-lg text-[#c9a961] italic">
              (Not Legal Counsel or Advice)
            </p>
          </div>
        </header>

        <main className="relative max-w-5xl mx-auto px-8 py-12 sm:px-12">
          <DisclaimerBanner />

          <div className="mt-10">
            <QueryInput
              value={query}
              onChange={setQuery}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          {(response || isLoading) && (
            <div className="mt-10">
              <AnswerDisplay response={response} isLoading={isLoading} />
            </div>
          )}

          <div className="mt-16 pt-8 text-center">
            <p className="text-base text-[#5c4433] italic leading-relaxed">
              For matters of specific legal concern, the Reader is earnestly advised
              <br />
              to consult with a qualified practitioner of the Legal profession
            </p>

            <p
              className="mt-6 text-xs text-[#8b6914] tracking-[0.3em]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ANNO MMXXVI
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
