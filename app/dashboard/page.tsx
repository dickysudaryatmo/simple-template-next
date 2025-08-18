// import Sidebar from '@/components/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import  SidebarLayout  from "@/components/layout/sidebar-layout";
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
export default async function DashboardPage() {
// const { data: session } = useSession()
const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  console.log(session)
  return (
    <div>
      <SidebarLayout>
        <div className="relative flex w-full flex-1 flex-col">
          <div className="flex-1 p-2 md:p-4">
            <header className="flex items-center h-10 px-4 border-b">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </header>
            <main className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">1,234</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">$56,789</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Active Now</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">567</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <p>User registration: John Doe</p>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                      <div className="border-b pb-4">
                        <p>Payment received: $250.00</p>
                        <p className="text-sm text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </SidebarLayout>
    </div>

  )
}