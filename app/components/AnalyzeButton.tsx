"use client";

import { useState } from "react";
import { Task } from "../utils/types";
import { Sparkles, X } from "lucide-react";

/**
 * AnalyzeButton:
 * - Sends current tasks to /api/analyze
 * - Renders result or friendly errors
 * - Handles loading and disabled states
 */
type AnalyzeButtonProp = {
  tasks: Task[];
};

const AnalyzeButton = ({ tasks }: AnalyzeButtonProp) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks }),
      });

      const data = await res.json();

      if (!res.ok) {
        // map common error cases to friendly messages
        if (res.status === 400 && (data?.error || "").includes("Missing")) {
          setError(
            "AI is not configured. Add your API key, reload, and try again"
          );
        } else if (res.status === 429) {
          setError("Rate limit reached. Please wait a moment and retry.");
        } else {
          setError(data?.error || "Analysis failed. Please try again.");
        }
      } else {
        setResult(data.result);
      }
    } catch {
      setError("Network issue. Check your connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  const closeResult = () => {
    setResult(null);
    setError(null);
  };
  return (
    <div className="w-full sm:w-auto">
      <button
        onClick={analyze}
        disabled={loading || !!result}
        className={`inline-flex items-center gap-2 rounded-md text-white font-semibold px-4 py-2 ${loading || result ? "bg-purple-400 text-white cursor-not-allowed": "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"} `}
      >
        <Sparkles aria-hidden /> {loading ? "Analyzing" : "Analyze My Day"}
      </button>

      {/* inline accessible feedback areas */}
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-3 relative rounded-md border border-gray-300 p-3 text-sm bg-background">
          <button
            aria-label = "Close analysis result"
            className="absolute top-0 right-0 p-1 rounded cursor-pointer"
            onClick={closeResult}
          >
            <X className="w-5 h-5 text-red-600" aria-hidden/>
          </button>
          <div className="mt-2">{result}</div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeButton;
