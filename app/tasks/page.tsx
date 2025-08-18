// app/tasks/page.tsx
import { Metadata } from "next"
// import { z } from "zod"

import { columns, Task } from "@/components/table-task/columns"
import { DataTable } from "@/components/table-task/data-table"
import  SidebarLayout  from "@/components/layout/sidebar-layout";
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Sample data - in a real app, this would come from your API/database
const tasks: Task[] = [
  {
    id: "TASK-8782",
    code: "TASK-8782",
    title: "You can't compress the program without quantifying the open-source SSD pixel!",
    status: "in-progress",
    priority: "medium",
    label: "bug",
  },
  {
    id: "TASK-7878",
    code: "TASK-7878", 
    title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "todo",
    priority: "high",
    label: "feature",
  },
  {
    id: "TASK-7839",
    code: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: "todo",
    priority: "high",
    label: "bug",
  },
  {
    id: "TASK-5562",
    code: "TASK-5562",
    title: "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    status: "todo",
    priority: "medium",
    label: "feature",
  },
  {
    id: "TASK-8686",
    code: "TASK-8686",
    title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: "canceled",
    priority: "medium",
    label: "feature",
  },
  {
    id: "TASK-1280",
    code: "TASK-1280",
    title: "Use the digital TLS panel, then you can transmit the haptic system!",
    status: "done",
    priority: "high",
    label: "bug",
  },
  {
    id: "TASK-7262",
    code: "TASK-7262",
    title: "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
    status: "done",
    priority: "high",
    label: "feature",
  },
  {
    id: "TASK-1138",
    code: "TASK-1138",
    title: "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
    status: "in-progress",
    priority: "medium",
    label: "feature",
  },
  {
    id: "TASK-7184",
    code: "TASK-7184",
    title: "We need to program the back-end THX pixel!",
    status: "todo",
    priority: "low",
    label: "bug",
  },
  {
    id: "TASK-5160",
    code: "TASK-5160",
    title: "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
    status: "in-progress",
    priority: "high",
    label: "feature",
  },
  {
    id: "TASK-5618",
    code: "TASK-5618",
    title: "Generating the driver won't do anything, we need to index the online SSL application!",
    status: "done",
    priority: "medium",
    label: "documentation",
  },
  {
    id: "TASK-6699",
    code: "TASK-6699",
    title: "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD feed!",
    status: "todo",
    priority: "medium",
    label: "documentation",
  },
  {
    id: "TASK-2858",
    code: "TASK-2858",
    title: "We need to override the online UDP bus!",
    status: "todo",
    priority: "medium",
    label: "bug",
  },
  {
    id: "TASK-9864",
    code: "TASK-9864",
    title: "The CSV monitor is down, parse the cross-platform application so we can transmit the PNG alarm!",
    status: "in-progress",
    priority: "high",
    label: "feature",
  },
  {
    id: "TASK-8404",
    code: "TASK-8404",
    title: "We need to back up the optical ADP array!",
    status: "done",
    priority: "low",
    label: "documentation",
  },
  {
    id: "TASK-3902",
    code: "TASK-3902",
    title: "Connecting the system won't do anything, we need to input the mobile AI panel!",
    status: "todo",
    priority: "high",
    label: "documentation",
  },
]

export default function TaskPage() {
  return (
    <div>
      <SidebarLayout>
        <div className="h-full flex-1 flex-col space-y-8 p-4 sm:p-8 flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
              <p className="text-muted-foreground">
                  Here&apos;s a list of your tasks for this month!
              </p>
            </div>
            <div className="flex items-center space-x-2">
            {/* You can add additional actions here like create task button */}
            </div>
          </div>
          <DataTable data={tasks} columns={columns} />
        </div>
      </SidebarLayout>
    </div>
  )
}