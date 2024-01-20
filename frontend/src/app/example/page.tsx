"use client";
import React, { useState } from "react";
import { getTest } from "@api/example/route";

export default function Page() {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const data = await getTest();
    setMessage(data.message);
  };

  return (
    <div className="flex flex-col p-12 gap-5">
      This is a page to test our Django API.
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
        >
          Ping api
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
}
