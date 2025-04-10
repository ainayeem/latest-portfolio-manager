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
import { deleteSkillById } from "@/services/skill";
import { TSkill } from "@/types/skills";
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
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

export default function ManageSkill({ skills }: { skills: TSkill[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDeleteSkill = async (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      try {
        const response = await deleteSkillById(id);
        if (response?.success) {
          toast.success(response?.message);
        } else {
          toast.error(response?.error[0]?.message || "Failed to delete skill");
        }
      } catch {
        toast.error("Something went wrong!");
      }
    }
  };

  const columns: ColumnDef<TSkill>[] = [
    {
      accessorKey: "icon",
      header: "Icon",
      cell: ({ row }) => {
        const icon = row.getValue("icon") as string;
        return (
          <div className="w-12 h-12 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <Image
              src={icon || "/skill-icon-placeholder.svg"}
              width={48}
              height={48}
              alt="Skill icon"
              className="object-contain p-1"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/skill-icon-placeholder.svg";
              }}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Skill Name",
      cell: ({ row }) => <div className="font-medium capitalize">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        const categoryColors: Record<string, string> = {
          frontend: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
          backend: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
          others: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              categoryColors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {category}
          </span>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{row.getValue("description") || "No description"}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const skill = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Open actions menu">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <Link href={`/skills/update-skill/${skill?._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <FaEdit className="mr-2 h-4 w-4 text-amber-500" />
                  Edit
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                onClick={() => handleDeleteSkill(skill?._id)}
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
    data: skills,
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
          placeholder="Filter skills by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
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
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/skills/create-skill">
            <Button variant="default">Add New Skill</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-md border dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                  No skills found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {table.getRowModel().rows.length} of {skills.length} skills
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
