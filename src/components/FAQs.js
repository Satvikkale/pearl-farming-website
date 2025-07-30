import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState({}); // Track replies for each question

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = userData?.userType === "admin"; // Check if the user is an admin

  const fetchFAQs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/faqs");
      setFaqs(response.data);
    } catch (error) {
      console.error("Failed to fetch FAQs", error);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/add-faq", { question });
      alert("Your question has been posted!");
      setQuestion("");
      fetchFAQs(); // Refresh the FAQ list
    } catch (error) {
      console.error("Failed to post question", error);
      alert("Failed to post your question. Please try again.");
    }
  };

  const handleReply = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/reply-faq/${id}`, { reply: reply[id] });
      alert("Reply added successfully!");
      setReply({ ...reply, [id]: "" }); // Clear the reply input for the question
      fetchFAQs(); // Refresh the FAQ list
    } catch (error) {
      console.error("Failed to add reply", error);
      alert("Failed to add reply. Please try again.");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">FAQs</h1>

      {/* Add Question Form */}
      <div className="bg-gray-100 p-4 rounded-md shadow-md p-6 rounded-xl max-w-xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Post Your Question</h2>
        <form onSubmit={handleAddQuestion} className="space-y-4">
          <textarea
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
          >
            Post Question
          </button>
        </form>
      </div>

      {/* Display FAQs */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq._id}
            className="group border-s-4 border-gray-200 bg-gray-50 p-4 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex items-center justify-between gap-1.5 text-gray-900">
              <h2 className="text-lg font-medium">{faq.question}</h2>
              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <p className="pt-4 text-gray-900">
              {faq.reply ? (
                <>
                  <strong>-</strong> {faq.reply}
                </>
              ) : (
                isAdmin && ( // Only show the reply form if the user is an admin
                  <div className="mt-4">
                    <textarea
                      value={reply[faq._id] || ""}
                      onChange={(e) => setReply({ ...reply, [faq._id]: e.target.value })}
                      placeholder="Write a reply..."
                      className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                    <button
                      onClick={() => handleReply(faq._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
                    >
                      Reply
                    </button>
                  </div>
                )
              )}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Posted on: {new Date(faq.createdAt).toLocaleDateString()}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
