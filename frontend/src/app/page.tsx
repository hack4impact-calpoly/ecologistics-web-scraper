"use client";

import { ProjectTable } from "../components/projectTable";
import ScrapeButton from "../components/scrapeButton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IProject, ReformattedProject } from "../database/projectSchema";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it
                    if you prefer.
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
        <ProjectTable projectData={projectData} numProjects={numProjects} />
      </div>
    </div>
  );
}
