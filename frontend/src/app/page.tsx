"use client";
import { Button } from "@/components/ui/button";
import { ProposalTable } from "../components/proposalTable";
import { useSession } from "next-auth/react";

export default async function Home() {
  const handleScrape = () => {
    // CHANGE THIS TO NAVIGATE TO NEW PAGE
    console.log("change to scrape");
  };
  return (
    <main>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center bg-gray-200 mx-20 py-3 px-3">
          <div className="font-bold">
            <h1>Ecologistics Proposal Table</h1>
          </div>
          <div className="flex justify-center py-5">
            <Button variant="outline" onClick={handleScrape}>
              Begin Webscraping
            </Button>
          </div>
          <p>
            Development Project Approval Milestones that Trigger Document
            Publication in Local/State Systems
          </p>
        </div>
        <ProposalTable />
      </div>
    </main>
  );
}
