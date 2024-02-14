"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  const handleScrape = () => {
    // CHANGE THIS TO NAVIGATE TO NEW PAGE
    console.log("change to scrape");
  };
  return (
    <main>
      <h1>Home</h1>
      <div>The button below will being scraping information from the site.</div>
      <div className="flex justify-center h-screen">
        <Button variant="outline" onClick={handleScrape}>
          Begin Webscraping
        </Button>
      </div>
    </main>
  );
}
