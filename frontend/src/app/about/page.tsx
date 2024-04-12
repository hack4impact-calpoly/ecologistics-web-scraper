"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const slo_hearings_url =
  "https://www.slocounty.ca.gov/Home/Meetings-Calendar.aspx";
const ceqa_url = "https://ceqanet.opr.ca.gov/";

export default function About() {
  const handleVisitSite = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col bg-primary-foreground rounded-lg w-full items-center justify-center py-5 px-20 gap-5">
        <h1 className="text-3xl font-bold">Data Sources</h1>

        <div className="grid grid-cols-2 gap-10">
          <Card className="flex flex-col justify-between w-[350px] h-[300px]">
            <CardHeader>
              <CardTitle className="text-center">
                SLO County Meetings Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                San Luis Obispo meeting calendar, along with links to the
                meeting agendas which include the projects being reviewed at
                that meeting.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                className="bg-secondary"
                onClick={() => handleVisitSite(slo_hearings_url)}
              >
                Visit Site
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col justify-between w-[350px] h-[300px]">
            <CardHeader>
              <CardTitle className="text-center">CEQAnet Web Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Online searchable database for all California Environmental
                Quality Act (CEQA) documents submitted to the State Clearing
                House for state review.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                className="bg-secondary"
                onClick={() => handleVisitSite(ceqa_url)}
              >
                Visit Site
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="flex flex-col bg-primary-foreground rounded-lg w-full items-center justify-center py-5 px-20 gap-5">
        <h1 className="text-3xl font-bold">Web Scraping Approach</h1>
        <Card className="flex flex-col w-full h-[200px]">
          <CardHeader>
            <CardTitle className="text-center">
              San Luis Obispo County
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <span className="font-bold">Abstract: </span>Get projects from SLO
              County Meetings Calendar, cross-reference in State Clearing House,
              display in table.
            </p>
            <p>
              <span className="font-bold">Details:</span>Scrape SLO County
              meetings calender once a week. For each hearing, identify each
              project up for review. For each project, identify the County File
              Number and other relevant information and cross-reference it in
              the State Clearing House. If a match is found, identify the
              project&apos;s unique SCH# and scrape additional information from
              the projects page.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col bg-primary-foreground rounded-lg w-full items-center justify-center py-5 px-20 gap-5">
        <h1 className="text-3xl font-bold">Statistics</h1>
        <div className="grid grid-cols-3 gap-10">
          <Card className="flex flex-col justify-between w-[350px] h-[300px]">
            <CardHeader>
              <CardTitle className="text-center">Total Projects</CardTitle>
            </CardHeader>
            <CardContent className="flex h-full justify-center items-center">
              <h1 className="text-7xl">--</h1>
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between w-[350px] h-[300px]">
            <CardHeader>
              <CardTitle className="text-center">% Connected to SCH</CardTitle>
            </CardHeader>
            <CardContent className="flex h-full justify-center items-center">
              <h1 className="text-7xl">--</h1>
            </CardContent>
          </Card>
          <Card className="flex flex-col w-[350px] h-[300px]">
            <CardHeader>
              <CardTitle className="text-center">Total Hearings</CardTitle>
            </CardHeader>
            <CardContent className="flex h-full justify-center items-center">
              <h1 className="text-7xl">--</h1>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
