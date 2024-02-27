"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "../lib/tableColumns";
import { IProposal } from "@/database/proposalSchema";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

async function getData(): Promise<IProposal[]> {
  // Fetch data from your API here.
  return [
    {
      name: "Cayucos Sanitary District",
      link: "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1696",
      date_approved: new Date("2024-01-16"),
      date_closed: new Date("2024-02-04"),
      review_status: "not yet under review",
      flag_status: "no",
      location: "City of Morro Bay",
      meeting_date: new Date("2024-02-08"),
      public_comment_end_date: new Date("2024-02-24"),
    },
    {
      name: "Buffalo Management Group",
      link: "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1696",
      date_approved: new Date("2021-04-14"),
      date_closed: new Date("2024-01-07"),
      review_status: "under review",
      flag_status: "yes",
      location: "County of San Luis Obispo",
      meeting_date: new Date("2024-02-07"),
      public_comment_end_date: new Date("2024-03-27"),
    },
    {
      name: "Chimney Rock Road",
      link: "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1753",
      date_approved: new Date("2022-07-18"),
      date_closed: new Date("2023-12-26"),
      review_status: "reviewed",
      flag_status: "no",
      location: "City of Paso Robles",
      meeting_date: new Date("2024-02-06"),
      public_comment_end_date: new Date("2024-04-21"),
    },
    {
      name: "Christie and Cliff Cate",
      link: "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1717",
      date_approved: new Date("2023-08-25"),
      date_closed: new Date("2024-01-01"),
      review_status: "under review",
      flag_status: "yes",
      location: "City of Paso Robles",
      meeting_date: new Date("2024-02-05"),
      public_comment_end_date: new Date("2024-04-05"),
    },
    {
      name: "Green Gate Farms",
      link: "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1739",
      date_approved: new Date("2018-09-15"),
      date_closed: new Date("2024-02-20"),
      review_status: "reviewed",
      flag_status: "yes",
      location: "City of San Luis Obispo",
      meeting_date: new Date("2024-02-23"),
      public_comment_end_date: new Date("2024-07-21"),
    },
    /*
    {
      name: "Green Gate Farms",
      link: "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1739",
      date_approved: new Date("2018-09-15").toDateString(),
      date_closed: new Date("2024-02-20").toDateString(),
      review_status: "reviewed",
      flag_status: "yes",
      location: "City of San Luis Obispo",
      meeting_date: new Date("2024-02-23").toDateString(),
      public_comment_end_date: new Date("2024-07-21").toDateString(),
    },
    */
  ];
}

export async function ProposalTable() {
  const tableData = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
