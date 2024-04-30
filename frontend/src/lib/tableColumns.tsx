"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IProject } from "@/database/projectSchema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const columns: ColumnDef<IProject>[] = [
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
  },
  {
    accessorKey: "reviewStatus",
    header: "Review Status",
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
    accessorKey: "moreInfo",
    header: () => "More Info",
    cell: ({ row, table }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] sm:min-h-[400px] sm:max-h-[700px]">
          <DialogHeader>
            <DialogTitle>Enter Content Here</DialogTitle>
            <DialogDescription>
              Row {table.getRowModel().rows.indexOf(row) + 1}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
  },
];
