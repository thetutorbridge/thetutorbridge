"use client";
import { useState } from "react";

export default function FloaterMessenger() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end sm:bottom-6 sm:right-6 bottom-3 right-3">
      {open && (
        <div className="mb-3 w-72 max-w-xs bg-white rounded-xl shadow-2xl border border-gray-200 p-4 flex flex-col gap-3 animate-fade-in-fast relative">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close Messenger"
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <a
            href="/doubt-solving/ask-doubt"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition"
            onClick={() => setOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.556 0 8.25-3.694 8.25-8.25S16.556 3.75 12 3.75 3.75 7.444 3.75 12c0 1.086.21 2.124.594 3.07a.75.75 0 01.056.47l-.36 2.16a.75.75 0 00.88.88l2.16-.36a.75.75 0 01.47.056A8.207 8.207 0 0012 20.25z" />
            </svg>
            Ask Doubt
          </a>
          <a
            href="/book-demo-class"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-medium transition"
            onClick={() => setOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v10.5A2.25 2.25 0 0113.5 21h-3a2.25 2.25 0 01-2.25-2.25V9m7.5 0h-7.5" />
            </svg>
            Book Free Demo
          </a>
          <a
            href="mailto:contact@thetutorbridge.com"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium transition"
            onClick={() => setOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.5 7.5a2.25 2.25 0 01-3.182 0l-7.5-7.5A2.25 2.25 0 012.25 6.993V6.75" />
            </svg>
            Contact Us
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Messenger"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12h9m-4.5-4.5v9" />
        </svg>
      </button>
    </div>
  );
} 