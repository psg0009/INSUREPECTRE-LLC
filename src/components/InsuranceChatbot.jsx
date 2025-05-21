import React, { useState } from "react";
import { getInsuranceAdvice } from "../api/insuranceBot";

export default function InsuranceChatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const botAnswer = await getInsuranceAdvice(question);
    setAnswer(botAnswer);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="q" className="font-bold">Ask about insurance:</label>
        <input
          id="q"
          className="border p-2 rounded"
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="e.g., What is a deductible?"
        />
        <button
          className="bg-indigo-700 text-white rounded p-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>
      {answer && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <span className="font-semibold text-indigo-700">Bot:</span> {answer}
        </div>
      )}
    </div>
  );
}
