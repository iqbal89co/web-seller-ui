"use client";

import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "./button";
import { PlusIcon, FileDownIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import StaticPagination from "./static-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  addLink?: string;
  exportService?: () => Promise<void>;
  name?: string;
}
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  addLink,
  exportService,
  name,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [activePage, setActivePage] = useState(1);
  const [activeLimit, setActiveLimit] = useState(10);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setSearchKey,
    state: {
      sorting,
      globalFilter: searchKey,
    },
  });

  const onPageChange = (page: number) => {
    setActivePage(page);
    table.setPageIndex(page - 1);
  };

  useEffect(() => {
    table.setPageSize(activeLimit);
  }, [activeLimit]);

  return (
    <div>
      <div className="flex items-center justify-between pb-4 gap-4">
        <Input
          placeholder="Cari..."
          className="max-w-sm"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <div className="flex gap-4">
          {exportService && (
            <Button onClick={exportService} className="gap-1">
              <FileDownIcon size={18} />
              Export
            </Button>
          )}
          {addLink && (
            <Link href={addLink}>
              <Button
                variant={"secondary"}
                className="flex items-center justify-center gap-1"
              >
                <PlusIcon size={18} />
                Tambah
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="flex justify-between mb-1 text-sm opacity-70">
        <span>
          Total {table.getRowCount()} {name}
        </span>
        <span>Rows per page: {table.getState().pagination.pageSize}</span>
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
      <div className="flex justify-between py-4 text-sm">
        <div>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
        <div className="flex space-x-2">
          <StaticPagination
            activePage={activePage}
            lastPage={Math.ceil(data?.length / activeLimit)}
            limit={activeLimit}
            setLimit={setActiveLimit}
            onPageChange={(page) => onPageChange(page)}
          />
        </div>
      </div>
    </div>
  );
}
