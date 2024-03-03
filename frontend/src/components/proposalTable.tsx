"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    console.log(pageSize);
  }, [pageSize]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false, // Enable manual pagination
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize, // Pass the current page size to the pagination state
      },
    },
  });

  const handleRowChange = (newPageSize: number) => {
    console.log("New page size:", newPageSize);
    setPageSize(newPageSize);
    setPageIndex(0); // Reset page index when page size changes
  };

  const rowsPerPageOptions = [1, 5, 10, 20, 50, 100];

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
        <Pagination>
          <PaginationContent>
            Rows Per Page &nbsp;
            <PaginationItem>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[1, 5, 10, 20, 50, 100].map((pageSize) => (
                    <SelectItem
                      key={pageSize}
                      value={`${pageSize}`}
                      onClick={() => handleRowChange(pageSize)}
                    >
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (table.getCanPreviousPage()) {
                    table.firstPage();
                    setPageIndex(0);
                  }
                }}
              >
                &lt;&lt;
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (table.getCanPreviousPage()) {
                    table.previousPage();
                    setPageIndex(pageIndex - 1);
                  }
                }}
              >
                &lt;
              </PaginationLink>
            </PaginationItem>
            <PaginationItem style={{ display: "flex", alignItems: "center" }}>
              Page &nbsp;
              <Input
                type="number"
                value={table.getState().pagination.pageIndex + 1} // Adding 1 because page index is 0-based
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const pageNumber = parseInt(event.target.value, 10);
                  if (
                    !isNaN(pageNumber) &&
                    pageNumber >= 1 &&
                    pageNumber <= table.getPageCount()
                  ) {
                    setPageIndex(pageNumber - 1); // Subtracting 1 to get the 0-based index
                  }
                }}
                inputMode="numeric"
                className="h-8 w-[50px] [&::-webkit-inner-spin-button]:appearance-none"
              />
              &nbsp; of {table.getPageCount()}
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (table.getCanNextPage()) {
                    table.nextPage();
                    setPageIndex(pageIndex + 1);
                  }
                }}
              >
                &gt;
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (table.getCanNextPage()) {
                    table.lastPage();
                    setPageIndex(table.getPageCount() - 1);
                  }
                }}
              >
                &gt;&gt;
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
