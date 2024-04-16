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
  getFilteredRowModel,
  ColumnFiltersState,
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
import { IProject } from "@/database/projectSchema";

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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnToFilter, setColumnToFilter] = useState("Link");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false, // Enable manual pagination
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize, // Pass the current page size to the pagination state
      },
      columnFilters,
    },
  });

  const handleRowChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPageIndex(0); // Reset page index when page size changes
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <Select
          value={columnToFilter}
          onValueChange={(value) => {
            setColumnToFilter(value);
          }}
        >
          <SelectTrigger className="h-10 w-32 flex justify-start items-center">
            <SelectValue placeholder={columnToFilter} />
          </SelectTrigger>
          <SelectContent side="top">
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const content = header.isPlaceholder
                    ? null
                    : typeof header.column.columnDef.header === "function"
                      ? (() => {
                          const headerResult = header.column.columnDef.header(
                            header.getContext()
                          );
                          if (headerResult) {
                            const props = headerResult.props;
                            if (
                              props &&
                              Array.isArray(props.children) &&
                              props.children.length > 0 &&
                              !props.children[0].includes("Date")
                            ) {
                              return props.children[0]; // Return the value to make it a valid ReactNode
                            }
                          }
                          return null; // Return null if the condition is not met
                        })()
                      : (() => {
                          const props = header.column.columnDef.header;
                          if (props && !props.includes("Date")) {
                            return props; // Return the value to make it a valid ReactNode
                          }
                          return null; // Return null if the condition is not met
                        })();

                  // Filter out null content
                  return content ? (
                    <SelectItem
                      key={header.id}
                      value={header.column.id}
                      onClick={() => setColumnToFilter(header.column.id)}
                    >
                      {content}
                    </SelectItem>
                  ) : null;
                })}
              </React.Fragment>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder={`Filter ${columnToFilter}...`}
          value={
            (table.getColumn(columnToFilter)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(columnToFilter)?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-2"
        />
      </div>
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
                            header.getContext()
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
                        cell.getContext()
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
                  {[5, 10, 20, 50, 100].map((pageSize) => (
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

async function getData(): Promise<IProject[]> {
  // Fetch data from your API here.
  return [
    {
      county_file_number: "DRC2016-00070",
      hearing_date: new Date(),
      review_status: "null",
      location: "San Luis Obispo",
      apn: "064-227-005",
      date_accepted: new Date(),
      requesting_party: "Gary and Carol Fischer",
      sch_number: "null",
      title: "null",
      public_hearing_agenda_link:
        "http://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1722",
      sch_page_link: "null",
      additional_notes: "null",
    },
    {
      county_file_number: "C-DRC2023-00050",
      hearing_date: new Date(),
      review_status: "null",
      location: "San Luis Obispo",
      apn: "073-031-020",
      date_accepted: new Date(),
      requesting_party: "Justin and Megan Warren",
      sch_number: "null",
      title: "null",
      public_hearing_agenda_link:
        "http://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1722",
      sch_page_link: "null",
      additional_notes: "null",
    },
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
