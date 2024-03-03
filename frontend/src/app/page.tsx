"use client";
import { ProposalTable } from "../components/proposalTable";
import ScrapeButton from "../components/scrapeButton";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <main>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center bg-gray-200 mx-20 py-3 px-3">
          <div className="font-bold">
            <h1>Ecologistics Proposal Table</h1>
          </div>
          <div className="flex justify-center py-5">
            <ScrapeButton />
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
