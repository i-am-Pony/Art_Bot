"use client";

import React from 'react';
import ImageRepeater from './ImageRepeater';
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

const images = [
  { src: 'https://images.nightcafe.studio/jobs/1VP5fu8SC4xBvOvPrddh/1VP5fu8SC4xBvOvPrddh--1--szgdt.jpg?tr=w-828,c-at_max', alt: 'Image 1' },
  { src: 'https://images.nightcafe.studio/jobs/QE5rmDW6RQZO5c4SLuQH/QE5rmDW6RQZO5c4SLuQH--1--hovt3.jpg?tr=w-828,c-at_max', alt: 'Image 2' },
  { src: 'https://images.nightcafe.studio/jobs/BPBVBcdqEY2KFFuWBtFv/BPBVBcdqEY2KFFuWBtFv--1--3rper.jpg?tr=w-828,c-at_max', alt: 'Image 3' },
];

const Page: React.FC = () => {
  return (
    <div>
      {/* Other content */}
      <ImageRepeater images={images} />
    </div>
  );
};

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat();

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-screen max-w-md py-24 mx-auto stretch">
      <div className="overflow-auto mb-8 w-full" ref={messagesContainerRef}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-teal-700 p-3 m-2 rounded-lg"
                : "bg-purple-700 p-3 m-2 rounded-lg"
            }`}
          >
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-end pr-4">
            <span className="animate-bounce">...</span>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 w-full max-w-md">
        <div className="flex flex-col justify-center mb-2 items-center">
          {messages.length == 0 && (
            <button
              className="bg-teal-500 p-2 text-white rounded shadow-xl"
              disabled={isLoading}
              onClick={() =>
                append({ role: "user", content: "Describe a portrait style painting" })
              }
            >
              Portrait
            </button>
          )}
          {messages.length == 0 && (
            <button
              className="bg-teal-500 p-2 text-white rounded shadow-xl"
              disabled={isLoading}
              onClick={() =>
                append({ role: "user", content: "Describe a futuristic world." })
              }
            >
              Futuristic
            </button>
          )}

          {messages.length == 0 && (
            <button
              className="bg-teal-500 p-2 text-white rounded shadow-xl"
              disabled={isLoading}
              onClick={() =>
                append({ role: "user", content: "Describe an Anime style image." })
              }
            >
              Anime Style
            </button>
          )}
          
          {messages.length == 2 && !isLoading && (
            <button
            className="bg-teal-500 p-2 text-white rounded shadow-xl"
            disabled={isLoading}
            onClick={async function handleImageUpload() {
              try {
                setImageIsLoading(true);
                const response = await fetch("api/images", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    message: messages[messages.length - 1].content,
                  }),
                });
                if (!response.ok) {
                  throw new Error(`Error fetching image: ${response.status}`);
                }
                const imageData = await response.json(); // Parse the response as JSON
                // Any additional logic you need here
              } catch (error) {
                console.error("Error handling image upload:", error);
              }
            }}
          >
            Generate image
          </button>          
          )}
        </div>
        </div>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            className="w-[95%] p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
            disabled={isLoading}
            value={input}
            placeholder="Choose a Style"
            onChange={handleInputChange}
          />
        </form>
      </div>
  );
}