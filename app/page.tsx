"use client";

import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";

export default function CardGenerator() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("Explore the Universe");
  const [description, setDescription] = useState(
    "Discover distant galaxies, nebulae, and cosmic wonders.",
  );
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1778400599089-af77d9a2c916?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
  );

  const exportAsPng = async () => {
    if (cardRef.current === null) return;

    try {
      // Ensure images from external domains are loaded with crossOrigin="anonymous"
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        style: {
          transform: "scale(1)", // Prevents scaling artifacts during capture
        },
      });

      const link = document.createElement("a");
      link.download = `${title.toLowerCase().replace(/\s+/g, "-")}-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating PNG:", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
        Card PNG Generator
      </h1>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Controls */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
          <h2 className="text-xl font-semibold mb-2 text-slate-300">
            Customize Content
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <button
            onClick={exportAsPng}
            className="w-full mt-4 bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow-lg shadow-blue-500/20"
          >
            Download as PNG
          </button>
        </div>

        {/* Live Preview / Capture Target */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4 text-slate-300 self-start md:self-center">
            Live Preview
          </h2>

          {/* Wrapper to control capture isolation */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl">
            <div
              ref={cardRef}
              className="w-80 bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-md flex flex-col"
            >
              {/* standard img tag is required for html-to-image CORS compatibility */}
              <img
                src={imageUrl}
                alt="Card visual"
                crossOrigin="anonymous"
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-5 flex flex-col grow">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  {title || "Untitled Card"}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed wrap-break-word">
                  {description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
