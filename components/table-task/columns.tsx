// components/tasks/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export type Task = {
  id: string
  code: string
  title: string
  status: "todo" | "in-progress" | "done" | "canceled"
  priority: "low" | "medium" | "high"
  label?: "bug" | "feature" | "documentation"
}

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("code")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = row.original.label

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      const statusConfig = {
        todo: { label: "Todo", color: "bg-gray-500" },
        "in-progress": { label: "In Progress", color: "bg-blue-500" },
        done: { label: "Done", color: "bg-green-500" },
        canceled: { label: "Canceled", color: "bg-red-500" },
      }

      const config = statusConfig[status as keyof typeof statusConfig]

      return (
        <div className="flex w-[100px] items-center">
          <div className={`h-2 w-2 rounded-full ${config.color} mr-2`} />
          {config.label}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string

      const priorityConfig = {
        low: { label: "Low", icon: "🔽" },
        medium: { label: "Medium", icon: "🔘" },
        high: { label: "High", icon: "🔴" },
      }

      const config = priorityConfig[priority as keyof typeof priorityConfig]

      return (
        <div className="flex items-center">
          <span className="mr-2">{config.icon}</span>
          {config.label}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]