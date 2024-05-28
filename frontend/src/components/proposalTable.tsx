"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, Cross2Icon } from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { columns } from "../lib/tableColumns";
import { DataTableFacetedFilter } from "@/lib/tableFacetedFilter";
import { IProject } from "@/database/projectSchema";
import { DialogClose } from "@radix-ui/react-dialog";

const reviewStatusColors: Record<any, string> = {
  Unreviewed: "#EC7590",
  "In Review": "#ffd166",
  Reviewed: "#06d6a0",
};

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
  const [columnToFilter, setColumnToFilter] = useState("countyFileNumber");

  const statuses = [
    {
      value: "Unreviewed",
      label: "Unreviewed",
    },
    {
      value: "In Review",
      label: "In Review",
    },
    {
      value: "Reviewed",
      label: "Reviewed",
    },
  ];

  let table = useReactTable({
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

  const [reviewTypes, setReviewTypes] = useState<Record<string, string>>({}); // Review status for each row
  const [selectedReviewType, setSelectedReviewType] = useState("");

  const handleRowChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPageIndex(0); // Reset page index when page size changes
  };

  const handleReviewClick = (reviewType: string, rowId: string) => {
    setSelectedReviewType(reviewType);
  };

  const handleReviewOKClick = () => {
    // TODO: * Implement review status change by calling API
    //       * Update the review status state in the table
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
                              props.children.length > 0
                            ) {
                              return props.children[0]; // Return the value to make it a valid ReactNode
                            }
                          }
                          return null; // Return null if the condition is not met
                        })()
                      : (() => {
                          const props = header.column.columnDef.header;
                          if (props) {
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
          placeholder={`Filter ${columnToFilter.split("_").join(" ")}...`}
          value={
            (table.getColumn(columnToFilter)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(columnToFilter)?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-2"
        />
        {table.getColumn("reviewStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("reviewStatus")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getState().columnFilters.length > 0 && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="max-w-sm ml-2"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
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
                <TableRow key={row.id} data-state={row.getIsSelected()}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.id.includes("review") ? (
                        <Dialog>
                          {" "}
                          {/* 🔴 The dialog provider outside of the DropdownMenuContent */}
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              className="bg-white text-zinc-900 
                              hover:bg-zinc-100/90 
                              dark:bg-zinc-500 dark:text-zinc-50 
                              dark:hover:bg-zinc-900/90 p-2 rounded-md"
                              style={{
                                outline: "1px solid #d3d3d3",
                                width: "160px",
                                backgroundColor: reviewTypes[row.id]
                                  ? reviewStatusColors[
                                      reviewTypes[row.id].toString()
                                    ]
                                  : reviewStatusColors[
                                      cell.getValue() as string
                                    ],
                              }}
                            >
                              {reviewTypes[row.id] === undefined
                                ? (cell.getValue() as React.ReactNode)
                                : (reviewTypes[row.id] as React.ReactNode)}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                style={{
                                  backgroundColor:
                                    reviewStatusColors["Unreviewed"],
                                  display: "flex",
                                  justifyContent: "center",
                                  paddingTop: "8px",
                                  paddingBottom: "8px",
                                }}
                              >
                                {cell.getValue() !== "Unreviewed" ? (
                                  <DialogTrigger
                                    onClick={() =>
                                      handleReviewClick("Unreviewed", row.id)
                                    }
                                  >
                                    Unreviewed
                                  </DialogTrigger>
                                ) : (
                                  "Unreviewed"
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                style={{
                                  backgroundColor:
                                    reviewStatusColors["In Review"],
                                  display: "flex",
                                  justifyContent: "center",
                                  paddingTop: "8px",
                                  paddingBottom: "8px",
                                  marginTop: "5px",
                                  marginBottom: "5px",
                                }}
                              >
                                {cell.getValue() !== "In Review" ? (
                                  <DialogTrigger
                                    onClick={() =>
                                      handleReviewClick("In Review", row.id)
                                    }
                                  >
                                    In Review
                                  </DialogTrigger>
                                ) : (
                                  "In Review"
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                style={{
                                  backgroundColor:
                                    reviewStatusColors["Reviewed"],
                                  display: "flex",
                                  justifyContent: "center",
                                  paddingTop: "8px",
                                  paddingBottom: "8px",
                                }}
                              >
                                {cell.getValue() !== "Reviewed" ? (
                                  <DialogTrigger
                                    onClick={() =>
                                      handleReviewClick("Reviewed", row.id)
                                    }
                                  >
                                    Reviewed
                                  </DialogTrigger>
                                ) : (
                                  "Reviewed"
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          {/* 🔴 DialogContent ouside of DropdownMenuContent */}
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Confirm Review Status Change
                              </DialogTitle>
                              <DialogDescription>
                                <div>
                                  Are you sure you want to change the review
                                  status to {selectedReviewType}?
                                  <br />
                                  <br />
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "10px", // adjust this value to create the desired space between child components
                                    }}
                                  >
                                    <Button
                                      style={{
                                        backgroundColor: reviewTypes[row.id]
                                          ? reviewStatusColors[
                                              reviewTypes[row.id].toString()
                                            ]
                                          : reviewStatusColors[
                                              cell.getValue() as string
                                            ],
                                        color: "black",
                                      }}
                                    >
                                      {reviewTypes[row.id] === undefined
                                        ? (cell.getValue() as React.ReactNode)
                                        : (reviewTypes[
                                            row.id
                                          ] as React.ReactNode)}
                                    </Button>
                                    <ArrowRightIcon />
                                    <Button
                                      style={{
                                        backgroundColor:
                                          reviewStatusColors[
                                            selectedReviewType
                                          ],
                                        color: "black",
                                      }}
                                    >
                                      {selectedReviewType}
                                    </Button>
                                  </div>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  variant="outline"
                                  onClick={() => handleReviewOKClick()}
                                >
                                  OK
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
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
  try {
    const response = await fetch("/api/projects");
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const data = await response.json();
    const reformattedProjects = data.map((project: any) => ({
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
    return reformattedProjects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export function ProposalTable() {
  const [tableData, setTableData] = useState<IProject[]>([]);
  const [numProjects, setNumProjects] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proposals = await getData();
        setTableData(proposals);
        setNumProjects(proposals.length);
      } catch (error) {
        console.error("Error fetching proposals", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-5">
      <div className="text-xl font-bold">
        San Luis Obispo County ({numProjects})
      </div>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
