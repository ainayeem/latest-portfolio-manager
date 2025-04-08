"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteProjectById } from "@/services/project";
import { TProject } from "@/types/projects";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FaCopy, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

export default function ManageProject({ projects }: { projects: TProject[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // delete a project
  const handleDeleteProject = async (id: string) => {
    try {
      const response = await deleteProjectById(id);
      if (response?.success) {
        toast.success("Project deleted successfully");
      } else {
        toast.error(response?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const columns: ColumnDef<TProject>[] = [
    {
      accessorKey: "thumbnail",
      header: "Thumbnail Image",
      cell: ({ row }) => {
        const thumbnail = row.getValue("thumbnail");

        return (
          <div className="overflow-hidden rounded-lg">
            <Image src={thumbnail as string} width={50} height={50} alt="Thumbnail Image" className="object-cover" />
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div className="font-medium capitalize">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "technologiesUsed",
      header: "Technologies",
      cell: ({ row }) => {
        const techs = row.getValue("technologiesUsed") as string[];
        return <div className="text-sm capitalize">{techs?.join(", ")}</div>;
      },
    },
    {
      accessorKey: "liveLink",
      header: "Live Link",
      cell: ({ row }) => (
        <a href={row.getValue("liveLink")} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          Visit
        </a>
      ),
    },
    {
      accessorKey: "frontendSourceCode",
      header: "Frontend Repo Link",
      cell: ({ row }) => {
        const frontendRepoLink = row.getValue("frontendSourceCode");
        return frontendRepoLink ? (
          <a href={frontendRepoLink as string} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Visit
          </a>
        ) : (
          <span className="text-gray-500">N/A</span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-transparent">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(project.liveLink)}>
                <FaCopy className="mr-2" />
                Copy Live Link
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href={`/projects/${project?._id}`} className="flex gap-2">
                  <FaEye className="mr-2 text-green-600" /> View Details
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href={`/projects/update-project/${project?._id}`} className="flex gap-2">
                  <FaEdit className="mr-2 text-amber-500" /> Edit
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleDeleteProject(project?._id)} className="cursor-pointer">
                <FaTrash className="mr-2 text-red-600" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: projects,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter projects by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="" key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No projects data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="">
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
