"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiCommand } from "react-icons/fi";
import "@/styles/globals.css";

export default function ScrapeButton() {
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/slo_county/hearings");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // data["current hearings"] stores an array of the links from the hearings route
      const data = await response.json();
      console.log("Current hearings:", data["current hearings"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
    console.log("change to scrape");
  };
  return (
    <Button
      onClick={handleScrape}
      disabled={loading}
      className="bg-secondary"
      style={{ width: "200px" }}
    >
      {loading ? (
        <FiCommand color="white" className="loading-icon" />
      ) : (
        "Update table"
      )}
    </Button>
  );
}
