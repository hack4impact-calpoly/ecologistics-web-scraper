"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Diagram from "@/components/diagram";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WebScrapingApproachCounty from "@/components/webScrapingApproachCounty";

const slo_hearings_url =
  "https://www.slocounty.ca.gov/Home/Meetings-Calendar.aspx";
const ceqa_url = "https://ceqanet.opr.ca.gov/";

const defaultData = {
  lastRan: "N/A",
  totalHearingsScraped: 0,
  totalProjectsScraped: 0,
  totalSCHProjectsScraped: 0,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function About() {
  const { data, error, isLoading } = useSWR("api/metadata", fetcher);
  const handleVisitSite = (url: string) => {
    window.open(url, "_blank");
  };

  if (error)
    return (
      <div
        style={{
          fontSize: "2em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        error loading
      </div>
    );

  if (isLoading)
    return (
      <div
        style={{
          fontSize: "2em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        Loading...
      </div>
    );

  let SCHPercentage = 0;
  if (data.totalSCHProjectsScraped > 0) {
    SCHPercentage =
      (data.totalSCHProjectsScraped / data.totalProjectsScraped) * 100;
  }

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col bg-primary-foreground rounded-lg w-full items-center justify-center py-5 px-20 gap-5">
        <h1 className="text-3xl font-bold">Data Sources</h1>
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="justify-center">
            <CarouselItem key="SLO Calendar" className="basis-1/3">
              <Card>
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
            </CarouselItem>
            <CarouselItem key="CEQA" className="basis-1/3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    CEQAnet Web Portal
                  </CardTitle>
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
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex flex-col bg-primary-foreground rounded-lg w-full items-center justify-center py-5 px-20 gap-5">
        <h1 className="text-3xl font-bold">Web Scraping Approach</h1>
        <Carousel
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            <CarouselItem key="San Luis Obispo">
              <WebScrapingApproachCounty county="San Luis Obispo" />
            </CarouselItem>
            <CarouselItem key="Santa Barbara">
              <WebScrapingApproachCounty county="Santa Barbara" />
            </CarouselItem>
            <CarouselItem key="Monterey">
              <WebScrapingApproachCounty county="Monterey" />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex flex-col bg-primary-foreground rounded-lg w-full items-center justify-center py-5 px-20 gap-5">
        <h1 className="text-3xl font-bold">Statistics</h1>
        <div className="grid grid-cols-3 gap-10">
          <Card className="flex flex-col justify-between w-[350px] h-[300px]">
            <CardHeader>
              <CardTitle className="text-center">Total Projects</CardTitle>
            </CardHeader>
            <CardContent className="flex h-full justify-center items-center">
              <h1 className="text-7xl">{data.totalProjectsScraped ?? 0}</h1>
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between w-[350px] h-[300px]">
            <CardHeader>
              <CardTitle className="text-center">Connected to SCH</CardTitle>
            </CardHeader>
            <CardContent className="flex h-full justify-center items-center">
              <h1 className="text-7xl">{SCHPercentage.toFixed(1)}%</h1>
            </CardContent>
          </Card>
          <Card className="flex flex-col w-[350px] h-[300px]">
            <CardHeader>
              <CardTitle className="text-center">Total Hearings</CardTitle>
            </CardHeader>
            <CardContent className="flex h-full justify-center items-center">
              <h1 className="text-7xl">{data.totalHearingsScraped ?? 0}</h1>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
