"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { FiCommand } from "react-icons/fi";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
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
import { IProject, ReformattedProject } from "@/database/projectSchema";
import { DialogClose } from "@radix-ui/react-dialog";
import { useToast } from "@/components/ui/use-toast";
import { SelectLabel } from "@radix-ui/react-select";

const reviewStatusColors: Record<any, string> = {
  Unreviewed: "#EC7590",
  "In Review": "#ffd166",
  Reviewed: "#06d6a0",
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  numProjects: number;
  fetchProjectData: () => Promise<never[] | undefined>;
}

function DataTable<TData, TValue>({
  columns,
  data,
  numProjects,
  fetchProjectData,
}: DataTableProps<TData, TValue>) {
  const { toast } = useToast();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnToFilter, setColumnToFilter] = useState("countyFileNumber");
  const [county, setCounty] = useState("San Luis Obispo County");

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

  const handleReviewOKClick = async (
    countyFileNumber: string,
    reviewStatus: string,
    rowId: string,
  ) => {
    try {
      const response = await fetch("api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          county_file_number: countyFileNumber,
          review_status: reviewStatus,
        }),
      });

      if (!response.ok) {
        toast({
          title: "Failed to update review status",
          variant: "destructive",
          duration: 3000,
        });
        throw new Error("Error updating additional notes");
      }

      setReviewTypes((prev) => ({
        ...prev,
        [rowId]: reviewStatus,
      }));

      toast({
        title: `Successfuly updated review status for project ${countyFileNumber}`,
        variant: "green",
        duration: 3000,
      });
      // refresh table data after updating review status
      fetchProjectData();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to update review status",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    console.log(county); // log the county state
  }, [county]);

  useEffect(() => {
    console.log(columnToFilter); // log the columnToFilter state
  }, [columnToFilter]);

  const handleCountyChange = (selectedCounty: string) => {
    console.log("changing county");
    setCounty(selectedCounty);
    // refresh table data after changing county
    // TODO:
    // * call fetchProjectData with the selected county
    // * update the table data with the new data
    // * update the numProjects with the new number of projects
    // * refactor database schemas for each county
    // * rewrite fetchProjectData to fetch data for the selected county
    // * reset filter columns for the new county
  };

  return (
    <div>
      <div className="text-xl font-bold">
        {county} ({numProjects})
      </div>
      <div className="flex items-center py-4">
        <Select
          value={county}
          onValueChange={(value) => {
            handleCountyChange(value);
          }}
        >
          <SelectTrigger className="w-60 mr-2">
            <SelectValue placeholder={county} />
            <SelectContent side="right">
              <SelectGroup>
                <SelectLabel className="text-center">Counties</SelectLabel>
                <SelectItem
                  key="sloCounty"
                  value={"San Luis Obispo County"}
                  onClick={() => handleCountyChange("San Luis Obispo County")}
                >
                  San Luis Obispo County
                </SelectItem>
                <SelectItem
                  key="montereyCounty"
                  value={"Monterey County"}
                  disabled
                  onClick={() => handleCountyChange("Monterey County")}
                >
                  Monterey County
                </SelectItem>
                <SelectItem
                  key="santaBarbaraCounty"
                  value={"Santa Barbara County"}
                  disabled
                  onClick={() => handleCountyChange("Santa Barbara County")}
                >
                  Santa Barbara County
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectTrigger>
        </Select>
        <Select
          value={columnToFilter}
          onValueChange={(value) => {
            setColumnToFilter(value);
          }}
        >
          <SelectTrigger className="w-60">
            <SelectValue placeholder={columnToFilter} />
          </SelectTrigger>
          <SelectContent side="right">
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
                                  className="bg-secondary"
                                  onClick={() => {
                                    const countyFileNumberCell = row
                                      .getVisibleCells()
                                      .find((cell) =>
                                        cell.id.includes("countyFileNumber"),
                                      );
                                    const countyFileNumber =
                                      countyFileNumberCell
                                        ? countyFileNumberCell.getValue()
                                        : null;
                                    handleReviewOKClick(
                                      countyFileNumber as string,
                                      selectedReviewType,
                                      row.id,
                                    );
                                  }}
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

export function ProjectTable({
  projectData,
  numProjects,
  fetchProjectData,
}: {
  projectData: ReformattedProject[];
  numProjects: number;
  fetchProjectData: () => Promise<never[] | undefined>;
}) {
  return (
    <div className="container mx-auto py-5">
      <DataTable
        columns={columns}
        data={projectData}
        numProjects={numProjects}
        fetchProjectData={fetchProjectData}
      />
    </div>
  );
}
