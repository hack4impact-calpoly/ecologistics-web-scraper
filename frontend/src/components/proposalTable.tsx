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
    [],
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
                            header.getContext(),
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
      countyFileNumber: "123456",
      hearingDate: new Date("2024-02-08"),
      reviewStatus: "Unreviewed",
      location: "City of Morro Bay",
      apn: "123-456-789",
      dateAccepted: new Date("2024-01-16"),
      requestingParty: "Bob",
      schNumber: 123456,
      title: "Cayucos Sanitary District",
      publicHearingAgenda:
        "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1696",
      schLink: "N/A",
      additionalNotes: "N/A",
    },
    {
      countyFileNumber: "654321",
      hearingDate: new Date("2024-02-10"),
      reviewStatus: "Unreviewed",
      location: "City of San Luis Obispo",
      apn: "987-654-321",
      dateAccepted: new Date("2024-01-18"),
      requestingParty: "Alice",
      schNumber: 654321,
      title: "Green Gate Farms",
      publicHearingAgenda:
        "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1696",
      schLink: "N/A",
      additionalNotes: "N/A",
    },
    {
      countyFileNumber: "789012",
      hearingDate: new Date("2024-02-15"),
      reviewStatus: "Unreviewed",
      location: "City of Paso Robles",
      apn: "012-345-678",
      dateAccepted: new Date("2024-01-22"),
      requestingParty: "John",
      schNumber: 789012,
      title: "Chimney Rock Road",
      publicHearingAgenda:
        "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1696",
      schLink: "N/A",
      additionalNotes: "N/A",
    },
    {
      countyFileNumber: "345678",
      hearingDate: new Date("2024-02-20"),
      reviewStatus: "Unreviewed",
      location: "City of Morro Bay",
      apn: "456-789-012",
      dateAccepted: new Date("2024-01-26"),
      requestingParty: "Sarah",
      schNumber: 345678,
      title: "Christie and Cliff Cate",
      publicHearingAgenda:
        "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1696",
      schLink: "N/A",
      additionalNotes: "N/A",
    },
    {
      countyFileNumber: "901234",
      hearingDate: new Date("2024-02-25"),
      reviewStatus: "Unreviewed",
      location: "County of San Luis Obispo",
      apn: "789-012-345",
      dateAccepted: new Date("2024-01-30"),
      requestingParty: "Mike",
      schNumber: 901234,
      title: "Buffalo Management Group",
      publicHearingAgenda:
        "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1696",
      schLink: "N/A",
      additionalNotes: "N/A",
    },
    {
      countyFileNumber: "567890",
      hearingDate: new Date("2024-03-02"),
      reviewStatus: "Unreviewed",
      location: "City of San Luis Obispo",
      apn: "234-567-890",
      dateAccepted: new Date("2024-02-03"),
      requestingParty: "Emily",
      schNumber: 567890,
      title: "Cayucos Sanitary District",
      publicHearingAgenda:
        "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1696",
      schLink: "N/A",
      additionalNotes: "N/A",
    },
    {
      countyFileNumber: "123456",
      hearingDate: new Date("2024-03-08"),
      reviewStatus: "Unreviewed",
      location: "County of San Luis Obispo",
      apn: "678-901-234",
      dateAccepted: new Date("2024-02-08"),
      requestingParty: "David",
      schNumber: 123456,
      title: "Morro Bay Development",
      publicHearingAgenda:
        "https://agenda.slocounty.ca.gov/iip/sanluisobispo/meeting/Details/1696",
      schLink: "N/A",
      additionalNotes: "N/A",
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
