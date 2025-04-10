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
      header: "Thumbnail",
      cell: ({ row }) => {
        const thumbnail = row.getValue("thumbnail") as string;
        return (
          <div className="w-16 h-16 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <Image
              src={thumbnail || "/placeholder-image.jpg"}
              width={64}
              height={64}
              alt="Project thumbnail"
              className="object-cover w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
              }}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div className="font-medium capitalize line-clamp-2">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "technologiesUsed",
      header: "Technologies",
      cell: ({ row }) => {
        const techs = row.getValue("technologiesUsed") as string[];
        return (
          <div className="flex flex-wrap gap-1">
            {techs?.slice(0, 3).map((tech, index) => (
              <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                {tech}
              </span>
            ))}
            {techs?.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                +{techs.length - 3} more
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "liveLink",
      header: "Live Link",
      cell: ({ row }) => (
        <Button asChild variant="link" className="p-0 h-auto">
          <a href={row.getValue("liveLink")} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
            View Live
          </a>
        </Button>
      ),
    },
    {
      accessorKey: "frontendSourceCode",
      header: "Frontend Code",
      cell: ({ row }) => {
        const frontendRepoLink = row.getValue("frontendSourceCode");
        return frontendRepoLink ? (
          <Button asChild variant="link" className="p-0 h-auto">
            <a
              href={frontendRepoLink as string}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Code
            </a>
          </Button>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">N/A</span>
        );
      },
    },
    {
      accessorKey: "isFeatured",
      header: "Featured",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.getValue("isFeatured")
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {row.getValue("isFeatured") ? "Yes" : "No"}
        </span>
      ),
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
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Open actions menu">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(project.liveLink);
                  toast.success("Live link copied to clipboard");
                }}
                className="cursor-pointer"
              >
                <FaCopy className="mr-2 h-4 w-4" />
                Copy Live Link
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <Link href={`/projects/${project?._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <FaEye className="mr-2 h-4 w-4 text-green-600" />
                  View Details
                </DropdownMenuItem>
              </Link>

              <Link href={`/projects/update-project/${project?._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <FaEdit className="mr-2 h-4 w-4 text-amber-500" />
                  Edit Project
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                onClick={() => {
                  if (confirm("Are you sure you want to delete this project?")) {
                    handleDeleteProject(project?._id);
                  }
                }}
                className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
              >
                <FaTrash className="mr-2 h-4 w-4" />
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
      },
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
        <Input
          placeholder="Filter projects by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                    {column.id.replace(/([A-Z])/g, " $1").trim()}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/projects/create-project">
            <Button variant="default">Add New Project</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-md border dark:border-gray-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {table.getRowModel().rows.length} of {projects.length} projects
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
