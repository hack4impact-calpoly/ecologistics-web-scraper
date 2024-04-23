"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiCommand } from "react-icons/fi";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

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

      toast.success(data.message);
      // refresh on success
      window.location.reload();
    } catch (error) {
      toast.error("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
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
