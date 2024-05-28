"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IProject, ReformattedProject } from "@/database/projectSchema";
import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const columns: ColumnDef<ReformattedProject>[] = [
  {
    accessorKey: "reviewStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Review Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "countyFileNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          County File Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "hearingDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hearing Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (row1: any, row2: any, columnId: any) => {
      const datestr1 = row1.getValue(columnId);
      const datestr2 = row2.getValue(columnId);

      // dates are in "Month Day, Year - Time AM/PM" format
      // remove '-' so string can be properly converted into date object
      const date1 = new Date(String(datestr1).replace("-", ""));
      const date2 = new Date(String(datestr2).replace("-", ""));

      return date1 < date2 ? 1 : -1;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "apn",
    header: "APN",
  },
  {
    accessorKey: "dateAccepted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Accepted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (row1: any, row2: any, columnId: any) => {
      const datestr1 = row1.getValue(columnId);
      const datestr2 = row2.getValue(columnId);

      // dates are in "Month Day, Year - Time AM/PM" format
      // remove '-' so string can be properly converted into date object
      const date1 = new Date(String(datestr1).replace("-", ""));
      const date2 = new Date(String(datestr2).replace("-", ""));

      return date1 < date2 ? 1 : -1;
    },
  },
  {
    accessorKey: "requestingParty",
    header: "Requesting Party",
  },
  {
    accessorKey: "schNumber",
    header: "SCH Number",
  },
  {
    accessorKey: "more_info",
    header: () => "More Info",
    cell: ({ row, column }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] sm:max-h-[700px]">
          <DialogHeader>
            <DialogTitle>
              Project {row.original.countyFileNumber}{" "}
              {row.original.title !== "N/A"
                ? `(
              ${row.original.title})`
                : ``}
            </DialogTitle>
            <DialogDescription>
              Click the edit icon to update additional notes related to this
              project.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="flex items-start h-16 space-x-2">
              <div className="w-1/2 overflow-auto whitespace-normal">
                <h1>Public Hearing Agenda Link:</h1>
                <DialogDescription>
                  <a
                    href={row.original.publicHearingAgenda}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row.original.publicHearingAgenda}
                  </a>
                </DialogDescription>
              </div>
              <Separator orientation="vertical" />
              {row.original.schLink && (
                <div className="w-1/2 overflow-auto whitespace-normal">
                  <h1>California State Clearing House Link:</h1>
                  <DialogDescription>
                    {row.original.schLink !== "N/A" ? (
                      <a
                        href={row.original.schLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.original.schLink}
                      </a>
                    ) : (
                      row.original.schLink
                    )}
                  </DialogDescription>
                </div>
              )}
            </div>
            <br />
            <Separator />
            <br />
            {row.original.additionalNotes && (
              <div>
                <h3>Additional Notes:</h3>
                <DialogDescription>
                  {row.original.additionalNotes}
                </DialogDescription>
                {/* ADD TEXT BOX AND BUTTONS FOR EDITING */}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    ),
  },
];
