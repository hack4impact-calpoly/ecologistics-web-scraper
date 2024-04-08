import { ProposalTable } from "../components/proposalTable";
import ScrapeButton from "../components/scrapeButton";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex flex-col w-ful gap-5">
      <div className="flex flex-col items-center justify-center bg-primary-foreground py-3 px-40 rounded-lg gap-3">
        <h1 className="text-3xl font-bold">Public Hearings Table</h1>
        <p className="text-center">
          This table compiles projects extracted via web scraping from a
          county-wide scheduling website, specifically tracking the date a given
          project will be discussed in an upcoming public hearing. It includes
          fields for the project name, county file number, location, hearing
          date, and State Clearing House Number (if applicable).
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
