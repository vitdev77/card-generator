"use client";

import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";

export default function CardGenerator() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("Explore Nature");
  const [description, setDescription] = useState(
    "Discover breathtaking views and hidden trails.",
  );

  const exportAsPng = async () => {
    if (cardRef.current === null) return;

    try {
      // Convert the HTML element to a data URL string
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        style: {
          transform: "scale(1)", // Ensures crisp rendering
        },
      });

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.download = "generated-card.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-8">Card Generator</h1>

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column: Controls */}
        <div className="space-y-4 bg-slate-800 p-6 rounded-xl shadow-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Card Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={exportAsPng}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors shadow"
          >
            Download as PNG
          </button>
        </div>

        {/* Right Column: Card Preview */}
        <div className="flex justify-center">
          {/* This wrapper div is what gets screenshotted */}
          <div
            ref={cardRef}
            className="relative w-80 h-112.5 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-end p-6 bg-slate-950"
          >
            {/* Background Image from the public folder */}
            <img
              src="/bg-card.avif"
              alt="Card Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

            {/* Card Content */}
            <div className="relative z-10 space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-wide wrap-break-word">
                {title || "Your Title Here"}
              </h2>
              <p className="text-sm text-gray-200 line-clamp-3 wrap-break-word">
                {description || "Your description goes here."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
