"use client";

import { ProjectTable } from "../components/projectTable";
import ScrapeButton from "../components/scrapeButton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IProject } from "../database/projectSchema";

export default function Home() {
  const [projectData, setProjectData] = useState<IProject[]>([]);
  const [numProjects, setNumProjects] = useState(0);

  async function fetchProjectData() {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      const projects = data.map((project: any) => ({
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
      setProjectData(projects);
      setNumProjects(projects.length);
      console.log("Fetched projects:", projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }

  // fetch data on page load
  useEffect(() => {
    fetchProjectData();
  }, []);

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
          <ScrapeButton fetchProjectData={fetchProjectData} />
        </div>
        <ProjectTable projectData={projectData} numProjects={numProjects} />
      </div>
    </div>
  );
}
