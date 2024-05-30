"use client";

import { ProjectTable } from "../components/projectTable";
import ScrapeButton from "../components/scrapeButton";
import { useEffect, useState } from "react";
import { ReformattedProject } from "../database/projectSchema";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Home() {
  const [projectData, setProjectData] = useState<ReformattedProject[]>([]);
  const [numProjects, setNumProjects] = useState(0);

  async function fetchProjectData() {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      const projects: ReformattedProject[] = data.map((project: any) => ({
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
        additionalNotes: project.additional_notes ?? "N/A",
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
      <div className="flex items-center justify-center bg-primary-foreground py-3 px-40 rounded-lg gap-3">
        <h1 className="text-3xl font-bold">
          Projects with Upcoming Public Hearings
        </h1>
        <Sheet>
          <SheetTrigger asChild>
            <a style={{ cursor: "pointer" }}>
              <InfoCircledIcon style={{ width: "30px", height: "30px" }} />
            </a>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>About the table</SheetTitle>
              <SheetDescription>
                Click a section to learn more.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Review Status Options</AccordionTrigger>
                  <AccordionContent>
                    <strong>Unreviewed:</strong> Default option for projects
                    that have not been reviewed yet. <br /> <br />
                    <strong>In Review:</strong> Projects that have been selected
                    for further review or action. <br /> <br />
                    <strong>Reviewed:</strong> Projects that have been reviewed
                    and no further action is needed. <br /> <br />
                    <em>
                      Click on the review status of a project to change it.
                    </em>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>More Info Column</AccordionTrigger>
                  <AccordionContent>
                    The far right column contains a button that when clicked
                    will display additional information about the project
                    including any links to the webpages the data was scraped
                    from. Additionally, from this dialog you can add notes to
                    the project for future reference.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What do N/A values mean?</AccordionTrigger>
                  <AccordionContent>
                    N/A values indicate that the data was unable to be scraped
                    from the webpage. This could be due to abnormal formatting
                    in an agenda. If the N/A value is in the &quot;SCH
                    Number&quot; column, it means that the project was not found
                    in the CEQA database.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Sorting, Searching, Filtering
                  </AccordionTrigger>
                  <AccordionContent>
                    This table supports sorting by hearing date and acceptance
                    date. You can search for projects by any of the columns by
                    selecting an attribute in the dropdown menu to the left of
                    the search bar. Additionally, you can filter projects by
                    Review Status and Location.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <div className="flex justify-center">
          <ScrapeButton fetchProjectData={fetchProjectData} />
        </div>
        <ProjectTable
          projectData={projectData}
          numProjects={numProjects}
          fetchProjectData={fetchProjectData}
        />
      </div>
    </div>
  );
}
