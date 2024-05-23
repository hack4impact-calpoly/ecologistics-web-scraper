import { ProposalTable } from "../components/proposalTable";
import ScrapeButton from "../components/scrapeButton";
import { useSession } from "next-auth/react";
import { IProject } from "@/database/projectSchema";
// import { GetServerSideProps } from "next";

async function getData(): Promise<IProject[]> {
  // Fetch data from your API here.
  try {
    const response = await fetch("http://localhost:3000/api/projects");
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const data = await response.json();
    const reformattedProjects = data.map((project: any) => ({
      countyFileNumber: project.county_file_number,
      hearingDate: project.hearing_date,
      reviewStatus: project.review_status ?? "Unreviewed",
      location: project.location,
      apn: project.apn,
      dateAccepted: project.date_accepted,
      requestingParty: project.requesting_party ?? "N/A",
      schNumber: project.sch_number ?? "N/A",
      title: project.title ?? "N/A",
      publicHearingAgenda: project.public_hearing_agenda_link,
      schLink: project.sch_page_link ?? "N/A",
      additionalNotes: project.additonal_notes ?? "N/A",
    }));
    return reformattedProjects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function Home() {
  const proposals = await getData();
  const numProjects = proposals.length;

  return (
    <div className="flex flex-col w-ful gap-5">
      <div className="flex flex-col items-center justify-center bg-primary-foreground py-3 px-40 rounded-lg gap-3">
        <h1 className="text-3xl font-bold">Public Hearings Table</h1>
        <p className="text-center">
          This table compiles projects extracted via web scraping from a
          county-wide scheduling website, specifically tracking the date a given
          project will be discussed in an upcoming public hearing. It includes
          fields for the project name, county file number, location, hearing
          date, and State Clearing House Number (if exists).
        </p>
      </div>
      <div>
        <div className="flex justify-center">
          <ScrapeButton />
        </div>
        <ProposalTable data={proposals} numProjects={numProjects} />
      </div>
    </div>
  );
}
