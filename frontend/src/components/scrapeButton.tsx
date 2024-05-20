"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiCommand } from "react-icons/fi";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "@/components/ui/use-toast";

export default function ScrapeButton() {
  const [loading, setLoading] = useState(false);
  const [dateRun, setDateRun] = useState("Never");
  const { toast } = useToast();

  // fetches metadata once, at the beginning
  useEffect(() => {
    fetchMetadata();
  }, []);

  const fetchMetadata = () => {
    fetch("api/metadata")
      .then((res) => res.json())
      .then((resAsJson) => setDateRun(resAsJson.lastRan));
  };

  const handleScrape = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/slo_county/hearings");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Current hearings:", data["current hearings"]);

      toast({
        title: "Successfully updated table!",
        variant: "green",
        duration: 3000,
      });
      // refresh on success
      // window.location.reload();
    } catch (error) {
      const county = "San Luis Obispo";
      toast({
        title:
          "Error: " +
          (error as Error).message +
          " hearings data from " +
          county +
          " county.",
        description:
          "If the issue persists, please reach out to Hack4Impact at Cal Poly.",
        variant: "destructive",
        duration: 5000,
      });
    }

    setTimeout(() => {
      setLoading(false);

      // get latest button run time
      fetchMetadata();
    }, 3000);
  };

  return (
    <div>
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
      {dateRun && (
        <p style={{ color: "grey", marginTop: "10px" }}>
          Last run:{" "}
          {new Date(dateRun).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      )}
    </div>
  );
}
