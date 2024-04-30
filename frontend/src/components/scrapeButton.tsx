"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiCommand } from "react-icons/fi";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "@/components/ui/use-toast";

export default function ScrapeButton() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
        title: "Success!",
        variant: "default",
        duration: 3000,
      });
      // refresh on success
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error: " + (error as Error).message,
        variant: "destructive",
        duration: 3000,
      });
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
