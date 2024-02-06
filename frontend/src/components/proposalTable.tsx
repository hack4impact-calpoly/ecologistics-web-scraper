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

import { Payment, columns } from "../lib/tableColumns";

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

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52g",
      amount: 110,
      status: "success",
      email: "doug@example.com",
    },
    {
      id: "728ed52h",
      amount: 120,
      status: "failed",
      email: "pug@example.com",
    },
    {
      id: "728ed52i",
      amount: 1275470,
      status: "failed",
      email: "rug@example.com",
    },
    {
      id: "728ed52j",
      amount: 1754385,
      status: "success",
      email: "jeff@example.com",
    },
    {
      id: "728ed52k",
      amount: 2345,
      status: "pending",
      email: "bill@example.com",
    },
    {
      id: "728ed52l",
      amount: 2385763,
      status: "failed",
      email: "mike@example.com",
    },
    {
      id: "728ed52m",
      amount: 0.00000000012,
      status: "success",
      email: "ted@example.com",
    },
    {
      id: "728ed52n",
      amount: 748383.58,
      status: "failed",
      email: "washington@example.com",
    },
    {
      id: "728ed52o",
      amount: 887,
      status: "pending",
      email: "adams@example.com",
    },
    {
      id: "728ed52p",
      amount: 1234,
      status: "success",
      email: "jefferson@example.com",
    },
    {
      id: "728ed52q",
      amount: 0.0098,
      status: "failed",
      email: "maddison@example.com",
    },
    {
      id: "728ed52r",
      amount: 101,
      status: "pending",
      email: "monroe@example.com",
    },
    {
      id: "728ed52s",
      amount: 1200000000000,
      status: "failed",
      email: "adams@example.com",
    },
    {
      id: "728ed52t",
      amount: 150,
      status: "success",
      email: "jacksong@example.com",
    },
    {
      id: "728ed52u",
      amount: 180,
      status: "failed",
      email: "van-buron@example.com",
    },
    {
      id: "728ed52v",
      amount: 122345,
      status: "failed",
      email: "ngl-idk-the-rest@example.com",
    },
    {
      id: "728ed52w",
      amount: 85432782345,
      status: "failed",
      email: "bill-clinton@example.com",
    },
    {
      id: "728ed52x",
      amount: 2092345,
      status: "failed",
      email: "bush@example.com",
    },
    {
      id: "728ed52y",
      amount: 12023452,
      status: "success",
      email: "obunga@example.com",
    },
    {
      id: "728ed52z",
      amount: 1202345,
      status: "pending",
      email: "donnyT@example.com",
    },
    {
      id: "728ed53a",
      amount: 1235420,
      status: "success",
      email: "joeyB@example.com",
    },

    // ...
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
