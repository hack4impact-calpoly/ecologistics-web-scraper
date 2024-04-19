"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
      const data = await response.json();
      console.log("Current hearings:", data["current hearings"]);

      // scraping endpoint
      const scrapingResponse = await fetch("http://localhost:8000/scraping");
      if (!scrapingResponse.ok) {
        throw new Error("Failed to scrape data");
      } else {
        // status code 200

        // re-render
        window.location.reload();
      }
      const scrapingData = await scrapingResponse.json();
      console.log("Scraping status:", scrapingData.status);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
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
