"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiCommand } from "react-icons/fi";
import "@/styles/globals.css";

export default function ScrapeButton() {
  const [loading, setLoading] = useState(false);
  const [buttonColor, setButtonColor] = useState("ffffff");

  const handleScrape = async () => {
    // CHANGE THIS TO NAVIGATE TO NEW PAGE
    setLoading(true);
    setButtonColor("E5E5E5");
    setTimeout(() => {
      setLoading(false);
      setButtonColor("FFFFFF");
    }, 3000);
    console.log("change to scrape");
  };
  return (
    <Button
      variant="outline"
      onClick={handleScrape}
      disabled={loading}
      style={{ backgroundColor: buttonColor }}
    >
      {loading ? <FiCommand className="loading-icon" /> : "Begin Webscraping"}
    </Button>
  );
}
