import { ProposalTable } from "../components/proposalTable";
import ScrapeButton from "../components/scrapeButton";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex flex-col w-ful gap-5">
      <div className="flex flex-col items-center justify-center bg-primary-foreground py-3 px-3 rounded-lg">
        <h1 className="text-3xl font-bold">Public Hearings Table</h1>
        <p>
          Development Project Approval Milestones that Trigger Document
          Publication in Local/State Systems
        </p>
      </div>
      <div>
        <div className="flex justify-center">
          <ScrapeButton />
        </div>
        <ProposalTable />
      </div>
    </div>
  );
}
