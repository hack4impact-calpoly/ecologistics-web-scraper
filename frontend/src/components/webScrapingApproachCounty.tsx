import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Diagram from "@/components/diagram";

interface WebScrapingApproachCountyProps {
  county: string;
}

export default function WebScrapingApproachCounty({
  county,
}: WebScrapingApproachCountyProps) {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle className="text-center">{county} County</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold">Abstract: </span>Get projects from{" "}
          {county} County Meetings Calendar, cross-reference in State Clearing
          House, display in table.
        </p>
        <p>
          <span className="font-bold">Details: </span>Scrape {county} County
          meetings calender once a week. For each hearing, identify each project
          up for review. For each project, identify the County File Number and
          other relevant information and cross-reference it in the State
          Clearing House. If a match is found, scrape the project&apos;s unique
          SCH# and scrape additional information from the projects page.
        </p>
        <Diagram />
      </CardContent>
    </Card>
  );
}
